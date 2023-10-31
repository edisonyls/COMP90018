package com.comp90018.controller;

import com.comp90018.bo.PostBO;
import com.comp90018.enums.RedisEnum;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import com.comp90018.service.FollowerService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@Api(tags = "follow controller")
@RequestMapping("post")
public class FollowController extends BaseController{

    @Autowired
    private FollowerService followerService;

    @PostMapping("follow")
    public JSONResult follow(@RequestParam String id,@RequestParam String posterId) {
        if(id == null || id.length() == 0 || posterId == null || posterId.length() == 0) {
            return JSONResult.errorCustom(ResponseStatusEnum.FAILED);
        }

        if(id.toLowerCase().equals(posterId.toLowerCase())) {
            return JSONResult.errorCustom(ResponseStatusEnum.CAN_NOT_FOLLOW_SELF);
        }

        Users follower = userService.queryUser(id);
        Users following = userService.queryUser(posterId);

        if(following == null || follower == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }

        followerService.doFollow(id, posterId);

        redis.set(RedisEnum.REDIS_FOLLOWER_FOLLOWING_RELATION + id + ":" + posterId, "0");

        redis.increment(RedisEnum.REDIS_FOLLOW_NUM + id, 1);
        redis.increment(RedisEnum.REDIS_FAN_NUM + posterId, 1);

        return JSONResult.ok();
    }
}
