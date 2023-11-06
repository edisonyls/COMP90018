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
public class ChangeUserBO {
    // can not change id, email
    private String id;

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
}
