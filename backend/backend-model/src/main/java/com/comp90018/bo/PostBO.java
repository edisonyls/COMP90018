package com.comp90018.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Id;
import java.util.Date;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PostBO {

    private String id;

    private String posterId;

    private Double latitude;

    private Double longitude;

    private Integer postType;

    private String picture;

    private String title;

    private String petCategory;

    private String petBreed;

    private String petName;

    private String location;

    private String contactNum;

    private String rewards;

    private String description;

    private String subject;

    private String content;

    private String tag;

    private Integer likesCounts;

    private Integer commentsCounts;

    private Integer privateLevel;

}
