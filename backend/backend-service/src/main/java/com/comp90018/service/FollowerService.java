package com.comp90018.service;

import com.comp90018.vo.ListFollowerVO;

import java.util.List;

public interface FollowerService {

    public boolean checkFollow(String followerId, String followingId);

    public void doFollow(String followerId, String followingId);

    public void unFollow(String followerId, String followingId);

    public List<ListFollowerVO> listFollower(String id);

    public List<ListFollowerVO> listFollowing(String id);
}
