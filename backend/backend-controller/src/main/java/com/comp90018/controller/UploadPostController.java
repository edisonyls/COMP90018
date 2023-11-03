package com.comp90018.controller;

import com.comp90018.bo.UploadPostBO;
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

import javax.validation.Valid;
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
    public JSONResult uploadPost(@Valid @RequestBody UploadPostBO uploadPostBO, MultipartFile multipartFile) {
        if (multipartFile == null) {
            uploadPostBO.setPostImg("1");
            //return JSONResult.errorMsg("Must contain an img.");
        }
        else {
            String fileName = multipartFile.getOriginalFilename();
            try {
                MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, multipartFile.getInputStream());
            } catch (Exception e) {
                JSONResult.errorMsg("Upload error, please try again.");
            }
            String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;
            uploadPostBO.setPostImg(imgUrl);
        }
        Post post = postService.createPost(uploadPostBO);
        if (post == null) {
            return JSONResult.errorMsg("Required information cannot be blank");
        }
        return JSONResult.ok(post);
    }

    @GetMapping("getAllPosts")
    public JSONResult getAllPosts() {
        List<Post> postList = postService.getAllPost();
        if (postList == null) {
            return JSONResult.errorMsg("No exist post");
        }
        return JSONResult.ok(postList);
    }

    @GetMapping("getAllPostsPerUser")
    public JSONResult getAllPostsPerUser(@RequestParam String userId) {
        List<Post> postList = postService.getAllPostPerUser(userId);
        if (postList.isEmpty()) {
            return JSONResult.errorMsg("This user does not have post");
        }
        return JSONResult.ok(postList);
    }

    @PostMapping("deleteAPost")
    public JSONResult deletePost(@RequestParam String postId) {
        boolean result = postService.deletedPost(postId);
        if (result == false) {
            return JSONResult.errorMsg("This post does not exist");
        }
        return JSONResult.ok("Delete successful");
    }

    @PostMapping("updatePost")
    public JSONResult updatePost(@RequestBody UploadPostBO uploadPostBO, MultipartFile multipartFile) {
        Post post = null;
        if (multipartFile == null) {
            post = postService.updatePost(uploadPostBO);
        }
        else {
            String fileName = multipartFile.getOriginalFilename();
            try {
                MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, multipartFile.getInputStream());
            } catch (Exception e) {
                JSONResult.errorMsg("Update error, please try again.");
            }
            String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;
            uploadPostBO.setPostImg(imgUrl);
            post = postService.updatePost(uploadPostBO);
            if (post == null) {
                return JSONResult.errorMsg("Update error, post not exist");
            }
        }
        return JSONResult.ok(post);
    }


}