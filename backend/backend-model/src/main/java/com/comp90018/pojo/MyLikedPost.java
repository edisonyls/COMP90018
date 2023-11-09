package com.comp90018.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "my_liked_post")
public class MyLikedPost {
    @Id
    private String id;

    /**
     * user id
     */
    @Column(name = "user_id")
    private String userId;

    /**
     * id of the post liked
     */
    @Column(name = "post_id")
    private String postId;

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
     * user id
     *
     * @return user_id - user id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * user id
     *
     * @param userId user id
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * id of the post liked
     *
     * @return post_id - id of the post liked
     */
    public String getPostId() {
        return postId;
    }

    /**
     * id of the post liked
     *
     * @param postId id of the post liked
     */
    public void setPostId(String postId) {
        this.postId = postId;
    }
}