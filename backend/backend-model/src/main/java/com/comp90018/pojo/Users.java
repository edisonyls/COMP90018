package com.comp90018.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

//@Entity
//@Table(name = "users")
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
     * 获取email address
     *
     * @return email1 - email address
     */
    public String getEmail1() {
        return email1;
    }

    /**
     * 设置email address
     *
     * @param email1 email address
     */
    public void setEmail1(String email1) {
        this.email1 = email1;
    }

    /**
     * 获取password
     *
     * @return password - password
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置password
     *
     * @param password password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取mobile phone number
     *
     * @return mobile - mobile phone number
     */
    public String getMobile() {
        return mobile;
    }

    /**
     * 设置mobile phone number
     *
     * @param mobile mobile phone number
     */
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    /**
     * 获取nickname
     *
     * @return nickname - nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * 设置nickname
     *
     * @param nickname nickname
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }


    /**
     * 获取profile picture
     *
     * @return profile - profile picture
     */
    public String getProfile() {
        return profile;
    }

    /**
     * 设置profile picture
     *
     * @param profile profile picture
     */
    public void setProfile(String profile) {
        this.profile = profile;
    }

    /**
     * 获取sex 0: man 1: woman 2: other
     *
     * @return sex - sex 0: man 1: woman 2: other
     */
    public Integer getSex() {
        return sex;
    }

    /**
     * 设置sex 0: man 1: woman 2: other
     *
     * @param sex sex 0: man 1: woman 2: other
     */
    public void setSex(Integer sex) {
        this.sex = sex;
    }

    /**
     * 获取birthday
     *
     * @return birthday - birthday
     */
    public Date getBirthday() {
        return birthday;
    }

    /**
     * 设置birthday
     *
     * @param birthday birthday
     */
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    /**
     * 获取country
     *
     * @return country - country
     */
    public String getCountry() {
        return country;
    }

    /**
     * 设置country
     *
     * @param country country
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * 获取state
     *
     * @return state - state
     */
    public String getState() {
        return state;
    }

    /**
     * 设置state
     *
     * @param state state
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取postcode
     *
     * @return postcode - postcode
     */
    public Integer getPostcode() {
        return postcode;
    }

    /**
     * 设置postcode
     *
     * @param postcode postcode
     */
    public void setPostcode(Integer postcode) {
        this.postcode = postcode;
    }

    /**
     * 获取personal introduction
     *
     * @return description - personal introduction
     */
    public String getDescription() {
        return description;
    }

    /**
     * 设置personal introduction
     *
     * @param description personal introduction
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 获取background image
     *
     * @return bg_img - background image
     */
    public String getBgImg() {
        return bgImg;
    }

    /**
     * 设置background image
     *
     * @param bgImg background image
     */
    public void setBgImg(String bgImg) {
        this.bgImg = bgImg;
    }


    /**
     * 获取created time
     *
     * @return created_time - created time
     */
    public Date getCreatedTime() {
        return createdTime;
    }

    /**
     * 设置created time
     *
     * @param createdTime created time
     */
    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    /**
     * 获取updated time
     *
     * @return updated_time - updated time
     */
    public Date getUpdatedTime() {
        return updatedTime;
    }

    /**
     * 设置updated time
     *
     * @param updatedTime updated time
     */
    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id='" + id + '\'' +
                ", email1='" + email1 + '\'' +
                ", password='" + password + '\'' +
                ", mobile='" + mobile + '\'' +
                ", nickname='" + nickname + '\'' +
                ", profile='" + profile + '\'' +
                ", sex=" + sex +
                ", birthday=" + birthday +
                ", country='" + country + '\'' +
                ", state='" + state + '\'' +
                ", postcode=" + postcode +
                ", description='" + description + '\'' +
                ", bgImg='" + bgImg + '\'' +
                ", createdTime=" + createdTime +
                ", updatedTime=" + updatedTime +
                '}';
    }
}