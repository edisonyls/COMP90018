package com.comp90018.controller;


import com.comp90018.enums.RedisEnum;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import com.comp90018.service.FollowerService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Api(tags = "unfollow controller")
@RequestMapping("user")
public class UnfollowController extends BaseController{
    @Autowired
    private FollowerService followerService;

    @PostMapping("unfollow")
    public JSONResult follow(@RequestParam String id, @RequestParam String posterId) {


        followerService.unFollow(id, posterId);

        return JSONResult.ok();
    }
}
