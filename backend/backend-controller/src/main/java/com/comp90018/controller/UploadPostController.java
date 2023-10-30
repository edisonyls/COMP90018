package com.comp90018.controller;

import com.comp90018.bo.UploadPostBO;
import com.comp90018.enums.PostTypeEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Post;
import com.comp90018.service.PostService;
import com.comp90018.utils.MinIOUtils;
import com.comp90018.utils.RedisOperator;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

@RestController
@Slf4j
@Api(tags = "post")
@RequestMapping("post")
public class UploadPostController extends BaseController {

    @Autowired
    RedisOperator redis;

    @Autowired
    PostService postService;

    @PostMapping("/uploadPost")
    public JSONResult uploadPost(@RequestBody UploadPostBO uploadPostBO) {

        String userId = uploadPostBO.getUserId();
        String postType = uploadPostBO.getPostType();
        String title = uploadPostBO.getTitle();
        String description = uploadPostBO.getDescription();
        Double latitude = uploadPostBO.getLatitude();
        Double longitude = uploadPostBO.getLongitude();
        String petCategory = uploadPostBO.getPetCategory();
        String petBread = uploadPostBO.getPetBread();
        String name = uploadPostBO.getPetName();
        String contactNumber = uploadPostBO.getContactNumber();
        String rewards = uploadPostBO.getRewards();
        String tag = uploadPostBO.getTag();
        String postImg = uploadPostBO.getPostImg();

        if(postImg == null) {
            return JSONResult.errorMsg("Img cannot be empty.");
        }

        try {
            byte[] imageBytes = Base64.getDecoder().decode(postImg);
            InputStream imageStream = new ByteArrayInputStream(imageBytes);
            String extension = ".jpg"; // Defaulting to .jpg, you can adjust this if you have the extension.
            String uniqueFileName = userId + "_" + System.currentTimeMillis() + extension;
            MinIOUtils.uploadFile(minIOConfig.getBucketName(), uniqueFileName, imageStream);
            postImg = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + uniqueFileName;
            uploadPostBO.setPostImg(postImg);
        } catch (IllegalArgumentException e) {
            return JSONResult.errorMsg("Provided image data is not a valid Base64 encoding.");
        } catch (Exception e) {
            e.printStackTrace();
            return JSONResult.errorMsg("An error occurred while processing the image.");
        }


        Post post = null;
        boolean ifValid = userId == null || postImg == null || petCategory == null || petBread == null ||
                name == null || contactNumber == null || title == null || latitude == null || longitude == null;
        switch (postType) {
            case "Pet Missing":
                if (ifValid) {
                    return JSONResult.errorMsg("Required fields cannot be blank for Pet Missing post.");
                }
                post = postService.createPetMissingPost(userId, postImg, PostTypeEnum.MISSING.getPostType(), petCategory,
                        petBread, name, contactNumber, title, description, latitude, longitude, rewards);
                break;
            case "Found A Pet":
                if (ifValid)
                    post = postService.createFoundAPetPost(userId, postImg, PostTypeEnum.FOUND.getPostType(), petCategory,
                            petBread, name, contactNumber, title, description, latitude, longitude); break;
            default:
                if (userId == null || tag == null || title == null || postImg == null || latitude == null || longitude == null) {
                    return JSONResult.errorMsg("Required fields cannot be blank for Pet Missing post.");
                }
                post = postService.createGeneralPost(userId, postImg, PostTypeEnum.GENERAL.getPostType(), title,
                        description, latitude, longitude, tag);
                break;
        }

        return JSONResult.ok(post);
    }


    @GetMapping("getAllPosts")
    public JSONResult getAllPosts() {
        List<Post> postList = postService.getAllPost();
        return JSONResult.ok(postList);
    }

    @GetMapping("getAllPostsPerUser")
    public JSONResult getAllPostsPerUser(@RequestParam String userId) {
        List<Post> postList = postService.getAllPostPerUser(userId);
        return JSONResult.ok(postList);
    }

}