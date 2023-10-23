package com.comp90018.vo;

import java.util.Date;

public class UserVO {
    private String id;

    private String email1;

    private String password;

    private String mobile;

    private String nickname;

    private String appId;

    private String profile;

    private Integer sex;

    private Date birthday;

    private String country;

    private String state;

    private Integer postcode;

    private String description;

    private String bgImg;

    private Integer canAppIdBeUpdated;

    private Date createdTime;

    private Date updatedTime;

    public UserVO(String id, String email1, String password, String mobile, String nickname, String appId, String profile, Integer sex, Date birthday, String country, String state, Integer postcode, String description, String bgImg, Integer canAppIdBeUpdated, Date createdTime, Date updatedTime) {
        this.id = id;
        this.email1 = email1;
        this.password = password;
        this.mobile = mobile;
        this.nickname = nickname;
        this.appId = appId;
        this.profile = profile;
        this.sex = sex;
        this.birthday = birthday;
        this.country = country;
        this.state = state;
        this.postcode = postcode;
        this.description = description;
        this.bgImg = bgImg;
        this.canAppIdBeUpdated = canAppIdBeUpdated;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }

    public UserVO() {
    }

    @Override
    public String toString() {
        return "UserVO{" +
                "id='" + id + '\'' +
                ", email1='" + email1 + '\'' +
                ", password='" + password + '\'' +
                ", mobile='" + mobile + '\'' +
                ", nickname='" + nickname + '\'' +
                ", appId='" + appId + '\'' +
                ", profile='" + profile + '\'' +
                ", sex=" + sex +
                ", birthday=" + birthday +
                ", country='" + country + '\'' +
                ", state='" + state + '\'' +
                ", postcode=" + postcode +
                ", description='" + description + '\'' +
                ", bgImg='" + bgImg + '\'' +
                ", canAppIdBeUpdated=" + canAppIdBeUpdated +
                ", createdTime=" + createdTime +
                ", updatedTime=" + updatedTime +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail1() {
        return email1;
    }

    public void setEmail1(String email1) {
        this.email1 = email1;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getPostcode() {
        return postcode;
    }

    public void setPostcode(Integer postcode) {
        this.postcode = postcode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBgImg() {
        return bgImg;
    }

    public void setBgImg(String bgImg) {
        this.bgImg = bgImg;
    }

    public Integer getCanAppIdBeUpdated() {
        return canAppIdBeUpdated;
    }

    public void setCanAppIdBeUpdated(Integer canAppIdBeUpdated) {
        this.canAppIdBeUpdated = canAppIdBeUpdated;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }
}