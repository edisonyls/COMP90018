package com.comp90018.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

public class Users {
    @Id
    private String id;

    /**
     * email address
     */
    private String email1;

    /**
     * password
     */
    private String password;

    /**
     * mobile phone number
     */
    private String mobile;

    /**
     * nickname
     */
    private String nickname;

    /**
     * profile picture
     */
    private String profile;

    /**
     * sex 0: man 1: woman 2: other
     */
    private Integer sex;

    /**
     * birthday
     */
    private Date birthday;

    /**
     * country
     */
    private String country;

    /**
     * state
     */
    private String state;

    /**
     * postcode
     */
    private Integer postcode;

    /**
     * personal introduction
     */
    private String description;

    /**
     * background image
     */
    @Column(name = "bg_img")
    private String bgImg;


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
     * email address
     *
     * @return email1 - email address
     */
    public String getEmail1() {
        return email1;
    }

    /**
     * email address
     *
     * @param email1 email address
     */
    public void setEmail1(String email1) {
        this.email1 = email1;
    }

    /**
     * password
     *
     * @return password - password
     */
    public String getPassword() {
        return password;
    }

    /**
     * password
     *
     * @param password password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * mobile phone number
     *
     * @return mobile - mobile phone number
     */
    public String getMobile() {
        return mobile;
    }

    /**
     * mobile phone number
     *
     * @param mobile mobile phone number
     */
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    /**
     * nickname
     *
     * @return nickname - nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * nickname
     *
     * @param nickname nickname
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }


    /**
     * profile picture
     *
     * @return profile - profile picture
     */
    public String getProfile() {
        return profile;
    }

    /**
     * profile picture
     *
     * @param profile profile picture
     */
    public void setProfile(String profile) {
        this.profile = profile;
    }

    /**
     * sex 0: man 1: woman 2: other
     *
     * @return sex - sex 0: man 1: woman 2: other
     */
    public Integer getSex() {
        return sex;
    }

    /**
     * sex 0: man 1: woman 2: other
     *
     * @param sex sex 0: man 1: woman 2: other
     */
    public void setSex(Integer sex) {
        this.sex = sex;
    }

    /**
     * birthday
     *
     * @return birthday - birthday
     */
    public Date getBirthday() {
        return birthday;
    }

    /**
     * birthday
     *
     * @param birthday birthday
     */
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    /**
     * country
     *
     * @return country - country
     */
    public String getCountry() {
        return country;
    }

    /**
     * country
     *
     * @param country country
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * state
     *
     * @return state - state
     */
    public String getState() {
        return state;
    }

    /**
     * state
     *
     * @param state state
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * postcode
     *
     * @return postcode - postcode
     */
    public Integer getPostcode() {
        return postcode;
    }

    /**
     * postcode
     *
     * @param postcode postcode
     */
    public void setPostcode(Integer postcode) {
        this.postcode = postcode;
    }

    /**
     * personal introduction
     *
     * @return description - personal introduction
     */
    public String getDescription() {
        return description;
    }

    /**
     * personal introduction
     *
     * @param description personal introduction
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * background image
     *
     * @return bg_img - background image
     */
    public String getBgImg() {
        return bgImg;
    }

    /**
     * background image
     *
     * @param bgImg background image
     */
    public void setBgImg(String bgImg) {
        this.bgImg = bgImg;
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