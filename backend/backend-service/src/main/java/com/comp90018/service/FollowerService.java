package com.comp90018.service;

import com.comp90018.vo.ListFollowerVO;

import java.util.List;

public interface FollowerService {

    //check if the follower follows the following
    public boolean checkFollow(String followerId, String followingId);

    //follower follows the following
    public void doFollow(String followerId, String followingId);

    //follower unfollows the following
    public void unFollow(String followerId, String followingId);

    //list all followers of the user
    public List<ListFollowerVO> listFollower(String userId);

    //list all followings of the user
    public List<ListFollowerVO> listFollowing(String userId);
}
