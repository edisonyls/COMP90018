package com.comp90018.impl;

import com.comp90018.enums.FriendEnum;
import com.comp90018.enums.MessageTypeEnum;
import com.comp90018.enums.RedisEnum;
import com.comp90018.enums.SystemMessageEnum;
import com.comp90018.idworker.Sid;
import com.comp90018.mapper.FollowersMapper;
import com.comp90018.mapper.ListFollowerMapper;
import com.comp90018.mapper.ListFollowingMapper;
import com.comp90018.pojo.Followers;
import com.comp90018.service.FollowerService;
import com.comp90018.service.MessageService;
import com.comp90018.utils.RedisOperator;
import com.comp90018.vo.ListFollowerVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FollowerServiceImpl implements FollowerService {

    final String Follow = "Follow";
    final Integer MyFollower = 0;
    final Integer MyFollowing = 1;

    @Autowired
    private Sid sid;
    @Autowired
    private MessageService messageService;
    @Autowired
    private ListFollowingMapper listFollowingMapper;
    @Autowired
    private ListFollowerMapper listFollowerMapper;
    @Autowired
    private RedisOperator redis;
    @Autowired
    private FollowersMapper followersMapper;

    @Override
    public boolean checkFollow(String followerId, String followingId) {
        return queryIsFollower(followerId, followingId) != null;
    }

    @Transactional
    @Override
    public void doFollow(String followerId, String followingId) {
        Followers follower = new Followers();
        String id = sid.nextShort();

        follower.setId(id);
        follower.setFollowerId(followerId);
        follower.setFollowingId(followingId);

        //query if the following follows follower
        //the sequence of following and follower should be inverse
        Followers following = queryIsFollower(followingId, followerId);
        if(following == null) {//the following doesn't follow the follower
            follower.setIsFollowerFriendOfMine(FriendEnum.NO.getFriendRelation());
        }else {
            //update the following
            following.setIsFollowerFriendOfMine(FriendEnum.YES.getFriendRelation());
            followersMapper.updateByPrimaryKey(following);

            follower.setIsFollowerFriendOfMine(FriendEnum.YES.getFriendRelation());
        }
        followersMapper.insert(follower);

        redis.set(RedisEnum.REDIS_FOLLOWER_FOLLOWING_RELATION + followerId + ":" + followingId, Follow); // redis add new relationship
        redis.increment(RedisEnum.REDIS_FOLLOW_NUM + followerId, 1); // num of follows of the follower ++
        redis.increment(RedisEnum.REDIS_FAN_NUM + followingId, 1); // num of fans of the following ++

        //send notify message
        HashMap<String, Object> map = new HashMap<>();
        map.put(SystemMessageEnum.BEHAVIOR.getSystemMessage(), SystemMessageEnum.FOLLOW_NOTIFY.getSystemMessage()); // (behavior, follow)
        messageService.createMessage(followerId, followingId, MessageTypeEnum.SYSTEM_MESSAGE.getType(), map);
    }

    @Transactional
    @Override
    public void unFollow(String followerId, String followingId) {
        Followers following = queryIsFollower(followerId, followingId);
        if(following == null) { // the follower doesn't follow the following
            return;
        }

        if(following.getIsFollowerFriendOfMine() == FriendEnum.NO.getFriendRelation()) {
            //if the follower isn't the friend. just delete the record of followers table
            followersMapper.delete(following);
        }else {
            //if the follower is the friend of the following
            //delete the record and update the relationship
            Followers following2 = queryIsFollower(followingId, followerId);
            following2.setIsFollowerFriendOfMine(FriendEnum.NO.getFriendRelation());
            followersMapper.updateByPrimaryKeySelective(following2);
            followersMapper.delete(following);
        }

        redis.del(RedisEnum.REDIS_FOLLOWER_FOLLOWING_RELATION + followerId + ":" + followingId);
        redis.decrement(RedisEnum.REDIS_FOLLOW_NUM + followerId, 1); // num of follows of the follower --
        redis.decrement(RedisEnum.REDIS_FAN_NUM + followingId, 1); // num of fans of the following --

        HashMap<String, Object> map = new HashMap<>();
        map.put(SystemMessageEnum.BEHAVIOR.getSystemMessage(), SystemMessageEnum.UNFOLLOW_NOTIFY.getSystemMessage()); // (behavior, follow)
        messageService.createMessage(followerId, followingId, MessageTypeEnum.SYSTEM_MESSAGE.getType(), map);
    }

    @Override
    public List<ListFollowerVO> listFollower(String userId) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);

        List<ListFollowerVO> listFollowerVOs = listFollowerMapper.listFollower(map);
        return indentifyFriends(userId, listFollowerVOs, MyFollower);
    }

    @Override
    public List<ListFollowerVO> listFollowing(String userId) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);

        List<ListFollowerVO> listFollowerVOs = listFollowingMapper.listFollowing(map);

        return indentifyFriends(userId, listFollowerVOs, MyFollowing);
    }

    /**
     * update friends of the followers or followings list
     * @return
     */
    public List<ListFollowerVO> indentifyFriends(String userId, List<ListFollowerVO> listFollowerVOS, int type) {

        if(type == MyFollower) {
            for(ListFollowerVO listFollowerVO: listFollowerVOS) {
                //if the user also follows its follower
                String s = redis.get(RedisEnum.REDIS_FOLLOWER_FOLLOWING_RELATION + userId + ":" + listFollowerVO.getId());
                if(Follow.equals(s)) {
                    listFollowerVO.setFriendOfMine(true);
                }else {
                    listFollowerVO.setFriendOfMine(false);
                }
            }
        } else if (type == MyFollowing) {
            for(ListFollowerVO listFollowerVO: listFollowerVOS) {
                //if the following also follows the user
                String s = redis.get(RedisEnum.REDIS_FOLLOWER_FOLLOWING_RELATION + listFollowerVO.getId() + ":" + userId);
                if(Follow.equals(s)) {
                    listFollowerVO.setFriendOfMine(true);
                }else {
                    listFollowerVO.setFriendOfMine(false);
                }
            }
        }

        return listFollowerVOS;
    }

    /**
     * query if the follower follows the following
     * @param followerId
     * @param followingId
     * @return
     */
    public Followers queryIsFollower(String followerId, String followingId) {
        Example example = new Example(Followers.class);
        Example.Criteria criteria = example.createCriteria().andEqualTo("followingId", followingId).andEqualTo("followerId", followerId);
        List<Followers> followers = followersMapper.selectByExample(example);

        if(followers != null && !followers.isEmpty()) {
            return followers.get(0);
        }

        return null;
    }


}
