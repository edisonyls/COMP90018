package com.comp90018.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

public class Post {
    @Id
    private String id;

    /**
     * post publisher, associated users table id
     */
    @Column(name = "poster_id")
    private String posterId;

    /**
     * latitude
     */
    private Double latitude;

    /**
     * longitude
     */
    private Double longitude;

    /**
     * post type, 0: pet missing 1: found a pet 2: general
     */
    @Column(name = "post_type")
    private Integer postType;

    /**
     * pet picture
     */
    private String picture;

    /**
     * post title
     */
    private String title;

    /**
     * pet category
     */
    @Column(name = "pet_category")
    private String petCategory;

    /**
     * pet breed
     */
    @Column(name = "pet_breed")
    private String petBreed;

    /**
     * pet name
     */
    @Column(name = "pet_name")
    private String petName;

    /**
     * location of lost
     */
    private String location;

    /**
     * contact number
     */
    @Column(name = "contact_num")
    private String contactNum;

    /**
     * rewards
     */
    private String rewards;

    /**
     * description
     */
    private String description;

    /**
     * subject
     */
    private String subject;

    /**
     * content
     */
    private String content;

    /**
     * tag
     */
    private String tag;

    /**
     * total number of likes
     */
    @Column(name = "likes_counts")
    private Integer likesCounts;

    /**
     * total number of comments
     */
    @Column(name = "comments_counts")
    private Integer commentsCounts;

    /**
     * privacy setting, 0: default, everyone, 1: friends, 2: followers, 3: self
     */
    @Column(name = "private_level")
    private Integer privateLevel;

    /**
     * created time
     */
    @Column(name = "created_time")
    private Date createdTime;

    /**
     * updated time
     */
    @Column(name = "updated_time")
    private Date updatedTime;

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
     * post publisher, associated users table id
     *
     * @return poster_id - post publisher, associated users table id
     */
    public String getPosterId() {
        return posterId;
    }

    /**
     * post publisher, associated users table id
     *
     * @param posterId post publisher, associated users table id
     */
    public void setPosterId(String posterId) {
        this.posterId = posterId;
    }

    /**
     * latitude
     *
     * @return latitude - latitude
     */
    public Double getLatitude() {
        return latitude;
    }

    /**
     * latitude
     *
     * @param latitude latitude
     */
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    /**
     * longitude
     *
     * @return longitude - longitude
     */
    public Double getLongitude() {
        return longitude;
    }

    /**
     * longitude
     *
     * @param longitude longitude
     */
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    /**
     * post type, 0: find my pet, 1: help pets go home, 2: share experience
     *
     * @return post_type - post type, 0: find my pet, 1: help pets go home, 2: share experience
     */
    public Integer getPostType() {
        return postType;
    }

    /**
     * post type, 0: find my pet, 1: help pets go home, 2: share experience
     *
     * @param postType post type, 0: find my pet, 1: help pets go home, 2: share experience
     */
    public void setPostType(Integer postType) {
        this.postType = postType;
    }

    /**
     * pet picture
     *
     * @return picture - pet picture
     */
    public String getPicture() {
        return picture;
    }

    /**
     * pet picture
     *
     * @param picture pet picture
     */
    public void setPicture(String picture) {
        this.picture = picture;
    }

    /**
     * post title
     *
     * @return title - post title
     */
    public String getTitle() {
        return title;
    }

    /**
     * post title
     *
     * @param title post title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * pet category
     *
     * @return pet_category - pet category
     */
    public String getPetCategory() {
        return petCategory;
    }

    /**
     * pet category
     *
     * @param petCategory pet category
     */
    public void setPetCategory(String petCategory) {
        this.petCategory = petCategory;
    }

    /**
     * pet breed
     *
     * @return pet_breed - pet breed
     */
    public String getPetBreed() {
        return petBreed;
    }

    /**
     * pet breed
     *
     * @param petBreed pet breed
     */
    public void setPetBreed(String petBreed) {
        this.petBreed = petBreed;
    }

    /**
     * pet name
     *
     * @return pet_name - pet name
     */
    public String getPetName() {
        return petName;
    }

    /**
     * pet name
     *
     * @param petName pet name
     */
    public void setPetName(String petName) {
        this.petName = petName;
    }

    /**
     * location of lost
     *
     * @return location - location of lost
     */
    public String getLocation() {
        return location;
    }

    /**
     * location of lost
     *
     * @param location location of lost
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * contact number
     *
     * @return contact_num - contact number
     */
    public String getContactNum() {
        return contactNum;
    }

    /**
     * contact number
     *
     * @param contactNum contact number
     */
    public void setContactNum(String contactNum) {
        this.contactNum = contactNum;
    }

    /**
     * rewards
     *
     * @return rewards - rewards
     */
    public String getRewards() {
        return rewards;
    }

    /**
     * rewards
     *
     * @param rewards rewards
     */
    public void setRewards(String rewards) {
        this.rewards = rewards;
    }

    /**
     * description
     *
     * @return description - description
     */
    public String getDescription() {
        return description;
    }

    /**
     * description
     *
     * @param description description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * subject
     *
     * @return subject - subject
     */
    public String getSubject() {
        return subject;
    }

    /**
     * subject
     *
     * @param subject subject
     */
    public void setSubject(String subject) {
        this.subject = subject;
    }

    /**
     * content
     *
     * @return content - content
     */
    public String getContent() {
        return content;
    }

    /**
     * content
     *
     * @param content content
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * tag
     *
     * @return tag - tag
     */
    public String getTag() {
        return tag;
    }

    /**
     * tag
     *
     * @param tag tag
     */
    public void setTag(String tag) {
        this.tag = tag;
    }

    /**
     * total number of likes
     *
     * @return likes_counts - total number of likes
     */
    public Integer getLikesCounts() {
        return likesCounts;
    }

    /**
     * total number of likes
     *
     * @param likesCounts total number of likes
     */
    public void setLikesCounts(Integer likesCounts) {
        this.likesCounts = likesCounts;
    }

    /**
     * total number of comments
     *
     * @return comments_counts - total number of comments
     */
    public Integer getCommentsCounts() {
        return commentsCounts;
    }

    /**
     * total number of comments
     *
     * @param commentsCounts total number of comments
     */
    public void setCommentsCounts(Integer commentsCounts) {
        this.commentsCounts = commentsCounts;
    }

    /**
     * privacy setting, 0: default, everyone, 1: friends, 2: followers, 3: self
     *
     * @return private_level - privacy setting, 0: default, everyone, 1: friends, 2: followers, 3: self
     */
    public Integer getPrivateLevel() {
        return privateLevel;
    }

    /**
     * privacy setting, 0: default, everyone, 1: friends, 2: followers, 3: self
     *
     * @param privateLevel privacy setting, 0: default, everyone, 1: friends, 2: followers, 3: self
     */
    public void setPrivateLevel(Integer privateLevel) {
        this.privateLevel = privateLevel;
    }

    /**
     * created time
     *
     * @return created_time - created time
     */
    public Date getCreatedTime() {
        return createdTime;
    }

    /**
     * created time
     *
     * @param createdTime created time
     */
    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    /**
     * updated time
     *
     * @return updated_time - updated time
     */
    public Date getUpdatedTime() {
        return updatedTime;
    }

    /**
     * updated time
     *
     * @param updatedTime updated time
     */
    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }
}