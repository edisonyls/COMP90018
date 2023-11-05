package com.comp90018.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChangeUserImgBO {
    // can not change id
    private String id;

    private String password;

    private String mobile;

    private String nickname;

    private Integer sex;

    private Date birthday;

    private String country;

    private String state;

    private Integer postcode;

    private String description;
    private String bgImg;
    private String profile;

}
