package com.comp90018.controller;

import com.comp90018.bo.UploadPostBO;
import com.comp90018.enums.PostTypeEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Post;
import com.comp90018.service.PostService;
import com.comp90018.utils.MinIOUtils;
import com.comp90018.utils.RedisOperator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("post")
public class UploadPostController extends BaseController {

    @Autowired
    RedisOperator redis;

    @Autowired
    PostService postService;

    @PostMapping("/uploadPost")
    public JSONResult uploadPost(@Valid @RequestBody UploadPostBO uploadPostBO, MultipartFile file) {

        Post post;

        if (uploadPostBO.getUserId() == null) {
            return JSONResult.errorMsg("User id cannot be blank");
        }

        uploadPostBO.setPostType(uploadPostBO.getPostType() == null ? "General" : uploadPostBO.getPostType());
        uploadPostBO.setTitle(uploadPostBO.getTitle() == null ? "Blank" : uploadPostBO.getTitle());
        uploadPostBO.setDescription(uploadPostBO.getDescription() == null ? "Blank" : uploadPostBO.getDescription());
        uploadPostBO.setPetCategory(uploadPostBO.getPetCategory() == null ? "Blank" : uploadPostBO.getPetCategory());
        uploadPostBO.setPetBread(uploadPostBO.getPetBread() == null ? "Blank" : uploadPostBO.getPetBread());
        uploadPostBO.setPetName(uploadPostBO.getPetName() == null ? "Blank" : uploadPostBO.getPetName());
        uploadPostBO.setContactNumber(uploadPostBO.getContactNumber() == null ? "Blank" : uploadPostBO.getContactNumber());
        uploadPostBO.setLatitude(uploadPostBO.getLatitude() == null ? Double.valueOf("-37.8136") : uploadPostBO.getLatitude());
        uploadPostBO.setLongitude(uploadPostBO.getLongitude() == null ? Double.valueOf("144.9631") : uploadPostBO.getLongitude());

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

        String fileName = file.getOriginalFilename();
        String postImgUrl = null;
        try {
            MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, file.getInputStream());
            postImgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;
            uploadPostBO.setPostImg(postImgUrl);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (postImgUrl == null) {
            return JSONResult.errorMsg("Pet picture cannot be blank");
        }

        String postImg = uploadPostBO.getPostImg();

        switch (postType) {
            case "Pet Missing": post = postService.createPetMissingPost(userId, postImg, PostTypeEnum.MISSING.getPostType(), petCategory, petBread, name, latitude, longitude); break;
            case "Found A Pet": post = postService.createFoundAPetPost(userId, postImg, PostTypeEnum.FOUND.getPostType(), petCategory, petBread, name, contactNumber, title, description, latitude, longitude); break;
            default: post = postService.createGeneralPost(userId, postImg, PostTypeEnum.GENERAL.getPostType(), title, description, latitude, longitude); break;
        }

        return JSONResult.ok(post);
    }


}