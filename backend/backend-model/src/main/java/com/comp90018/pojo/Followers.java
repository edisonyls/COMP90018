package com.comp90018.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

//@Entity
//@Table(name = "followers")
public class Followers {
    @Id
    private String id;

    /**
     * user id of one followed
     */
    @Column(name = "following_id")
    private String followingId;

    /**
     * user id of follower
     */
    @Column(name = "follower_id")
    private String followerId;

    /**
     * if the two follow each other and become friends, 0: not, 1: yes
     */
    @Column(name = "is_follower_friend_of_mine")
    private Integer isFollowerFriendOfMine;

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 获取user id of one followed
     *
     * @return following_id - user id of one followed
     */
    public String getFollowingId() {
        return followingId;
    }

    /**
     * 设置user id of one followed
     *
     * @param followingId user id of one followed
     */
    public void setFollowingId(String followingId) {
        this.followingId = followingId;
    }

    /**
     * 获取user id of follower
     *
     * @return follower_id - user id of follower
     */
    public String getFollowerId() {
        return followerId;
    }

    /**
     * 设置user id of follower
     *
     * @param followerId user id of follower
     */
    public void setFollowerId(String followerId) {
        this.followerId = followerId;
    }

    /**
     * 获取if the two follow each other and become friends, 0: not, 1: yes
     *
     * @return is_follower_friend_of_mine - if the two follow each other and become friends, 0: not, 1: yes
     */
    public Integer getIsFollowerFriendOfMine() {
        return isFollowerFriendOfMine;
    }

    /**
     * 设置if the two follow each other and become friends, 0: not, 1: yes
     *
     * @param isFollowerFriendOfMine if the two follow each other and become friends, 0: not, 1: yes
     */
    public void setIsFollowerFriendOfMine(Integer isFollowerFriendOfMine) {
        this.isFollowerFriendOfMine = isFollowerFriendOfMine;
    }
}