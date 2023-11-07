package com.comp90018.controller;

import com.comp90018.bo.UploadPostBO;
import com.comp90018.enums.RedisEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Post;
import com.comp90018.service.PostService;
import com.comp90018.utils.MinIOUtils;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@Api(tags = "post")
@RequestMapping("post")
public class PostController extends BaseController {

    @Autowired
    PostService postService;

//    @PostMapping("/uploadImg")
//    public JSONResult uploadPostImg(@Valid @RequestParam MultipartFile multipartFile, String userId) {
//        if (multipartFile == null) {
//            return JSONResult.errorMsg("No img!");
//        }
//        else {
//            String postId = RedisEnum.REDIS_POST_ID + userId + ":" + System.currentTimeMillis();
//            String fileName = multipartFile.getOriginalFilename();
//            try {
//                MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, multipartFile.getInputStream());
//            } catch (Exception e) {
//                return JSONResult.errorMsg("Upload error, please try again.");
//            }
//            String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;
////            redis.set(postId, imgUrl, 90);
//            Map<String, Object> map = new HashMap<String, Object>() {{
//                put("imgUrl", imgUrl);
//                put("postId", postId);
//            }};
//            return JSONResult.ok(map);
//        }
//    }

    @PostMapping("/uploadPost")
    public JSONResult uploadPost(@Valid @RequestBody UploadPostBO uploadPostBO) {
        String postId = uploadPostBO.getPostId();
        Post post = postService.createPost(uploadPostBO);
        if (post == null) {
            return JSONResult.errorMsg("Required information cannot be blank");
        }
//        String url = redis.get(postId);
//        log.info(url);
        String url = uploadPostBO.getPostImg();
        if (url == null) {
            return JSONResult.errorMsg("Img cannot be blank");
        }
        else {
            post.setPicture(url);
//            redis.del(url);
            return JSONResult.ok(post);
        }
    }

    @GetMapping("getAllPosts")
    public JSONResult getAllPosts(@RequestParam String postType) {
        List<Post> postList = postService.getAllPost(postType);
        if (postList == null || postList.isEmpty()) {
            return JSONResult.errorMsg("No valid post");
        }
        return JSONResult.ok(postList);
    }

    @GetMapping("getAllPostsPerUser")
    public JSONResult getAllPostsPerUser(@RequestParam String userId) {
        List<Post> postList = postService.getAllPostPerUser(userId);
        if (postList == null) {
            return JSONResult.errorMsg("This user does not have post");
        }
        return JSONResult.ok(postList);
    }

    @GetMapping("getFilteredPost")
    public JSONResult getFilteredPost(@RequestParam String postCategory) {
        List<Post> postList = postService.getFilteredPost(postCategory);
        if (postList == null) {
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
    public JSONResult updatePost(@RequestBody UploadPostBO uploadPostBO) {
        String postId = uploadPostBO.getPostId();
        Post post = null;
        post = postService.updatePost(uploadPostBO);
//        String url = redis.get(postId);
        String url = uploadPostBO.getPostImg();
        if (url != null) {
//            uploadPostBO.setPostImg(url);
            post.setPicture(url);
//            redis.del(url);
        }
        if (post == null) {
            return JSONResult.errorMsg("Update error, post not exist");
        }
        return JSONResult.ok(post);
    }

}