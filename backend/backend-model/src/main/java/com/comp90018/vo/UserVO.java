package com.comp90018.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserVO {
    private String id;

    private String email1;

    private String password;

    private String mobile;

    private String nickname;

    private String profile;

    private Integer sex;

    private Date birthday;

    private String country;

    private String state;

    private Integer postcode;

    private String description;

    private String bgImg;


    private Date createdTime;

    private Date updatedTime;

    private String UserToken;
    private Integer myFollows;
    private Integer myFans;
    private Integer myVlogLikes;
    private Integer myCommentLikes;

}