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

    @NotBlank(message = "userId is null")
    private String userId;

    @NotBlank(message = "postType is null")
    private String postType;

    private String title;

    private String description;

    @NotBlank(message = "latitude is null")
    private Double latitude;

    @NotBlank(message = "longitude is null")
    private Double longitude;

    private String petCategory;

    private String petBread;

    private String petName;

    private String contactNumber;

    @NotBlank(message = "Img is null")
    private String postImg;

    private String rewards;

    private String tag;

}
