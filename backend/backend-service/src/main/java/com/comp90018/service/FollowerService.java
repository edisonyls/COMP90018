package com.comp90018.service;

public interface FollowerService {

    public void doFollow(String followerId, String followingId);

    public void unFollow(String followerId, String followingId);
}
