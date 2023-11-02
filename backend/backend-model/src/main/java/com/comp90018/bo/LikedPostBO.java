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
public class LikedPostBO {

    @NotBlank(message = "postId is null")
    private String postId;

    @NotBlank(message = "userId is null")
    private String userId;

}
