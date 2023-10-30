package com.comp90018.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UploadPostBO {

    private String userId;

    private String postType;

    private String title;

    private String description;

    private Double latitude;

    private Double longitude;

    private String petCategory;

    private String petBread;

    private String petName;

    private String contactNumber;

    private String postImg;

    private String rewards;

    private String tag;

}
