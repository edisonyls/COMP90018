package com.comp90018.controller;

import com.comp90018.bo.LikedPostBO;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.service.PostLikeService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * post controller
 * like a post
 */
@RestController
@Slf4j
@Api(tags = "like post controller")
@RequestMapping("likedPost")
public class LikePostController extends BaseController{

    @Autowired
    PostLikeService postLikeService;

    @PostMapping("/likeAPost")
    public JSONResult likeAPost(@Valid @RequestBody LikedPostBO likedPostBO) {

        boolean result = postLikeService.likeAPost(likedPostBO);
        if (result == false) {
            return JSONResult.errorMsg("Error.");
        } else {
            return JSONResult.ok();
        }
    }

}
