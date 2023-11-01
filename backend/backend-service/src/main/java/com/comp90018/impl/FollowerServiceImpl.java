package com.comp90018.impl;

import com.comp90018.enums.FriendEnum;
import com.comp90018.enums.RedisEnum;
import com.comp90018.idworker.Sid;
import com.comp90018.mapper.FollowersMapper;
import com.comp90018.pojo.Followers;
import com.comp90018.service.FollowerService;
import com.comp90018.utils.RedisOperator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

@Service
public class FollowerServiceImpl implements FollowerService {
    @Autowired
    private Sid sid;

    @Autowired
    private RedisOperator redis;
    @Autowired
    private FollowersMapper followersMapper;

    @Transactional
    @Override
    public void doFollow(String followerId, String followingId) {
        Followers follower = new Followers();
        String id = sid.nextShort();

        follower.setId(id);
        follower.setFollowerId(followerId);
        follower.setFollowingId(followingId);

        //the sequence of following and follower should be inverse
        Followers following = queryIsFollower(followingId, followerId);
        if(following != null) {
            following.setIsFollowerFriendOfMine(FriendEnum.YES.getFriendRelation());
            followersMapper.updateByPrimaryKey(following);

            follower.setIsFollowerFriendOfMine(FriendEnum.YES.getFriendRelation());
        }else {
            follower.setIsFollowerFriendOfMine(FriendEnum.NO.getFriendRelation());
        }
        followersMapper.insert(follower);
        redis.set(RedisEnum.REDIS_FOLLOWER_FOLLOWING_RELATION + followerId + ":" + followingId, "0");

        redis.increment(RedisEnum.REDIS_FOLLOW_NUM + followerId, 1);
        redis.increment(RedisEnum.REDIS_FAN_NUM + followingId, 1);
    }

    @Transactional
    @Override
    public void unFollow(String followerId, String followingId) {
        Followers following = queryIsFollower(followerId, followingId);
        if(following == null) {
            return;
        }

        if(following.getIsFollowerFriendOfMine() == FriendEnum.NO.getFriendRelation()) {
            followersMapper.delete(following);
        }else {
            Followers following2 = queryIsFollower(followingId, followerId);
            following2.setIsFollowerFriendOfMine(FriendEnum.NO.getFriendRelation());
            followersMapper.updateByPrimaryKeySelective(following2);
            followersMapper.delete(following);
        }
        redis.del(RedisEnum.REDIS_FOLLOWER_FOLLOWING_RELATION + followerId + ":" + followingId);

        redis.decrement(RedisEnum.REDIS_FOLLOW_NUM + followerId, 1);
        redis.decrement(RedisEnum.REDIS_FAN_NUM + followingId, 1);
    }

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
