package com.comp90018.impl;

import com.comp90018.enums.FriendEnum;
import com.comp90018.idworker.Sid;
import com.comp90018.mapper.FollowersMapper;
import com.comp90018.pojo.Followers;
import com.comp90018.service.FollowerService;
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
            following.setIsFollowerFriendOfMine(FriendEnum.YES.getFriend());
            followersMapper.updateByPrimaryKey(following);

            follower.setIsFollowerFriendOfMine(FriendEnum.YES.getFriend());
        }else {
            follower.setIsFollowerFriendOfMine(FriendEnum.NO.getFriend());
        }
        followersMapper.insert(follower);
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
