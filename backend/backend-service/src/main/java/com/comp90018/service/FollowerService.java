package com.comp90018.service;

import com.comp90018.vo.ListFollowerVO;

import java.util.List;

public interface FollowerService {

    //check if the follower follows the following
    boolean checkFollow(String followerId, String followingId);

    //follower follows the following
    String doFollow(String followerId, String followingId);

    //follower unfollows the following
    String unFollow(String followerId, String followingId);

    //list all followers of the user
    List<ListFollowerVO> listFollower(String userId);

    //list all followings of the user
    List<ListFollowerVO> listFollowing(String userId);
}
