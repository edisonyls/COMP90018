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
    // change profile and bgImg
    private String id;
    private String bgImg;
    private String profile;

}
