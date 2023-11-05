package com.comp90018.controller;

import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import com.comp90018.service.FollowerService;
import com.comp90018.vo.ListFollowerVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@Api(tags = "follow controller")
@RequestMapping("post")
public class FollowController extends BaseController{

    @Autowired
    private FollowerService followerService;

    @PostMapping("follow")
    @ApiOperation("a follower follows a following ")
    public JSONResult follow(@RequestParam String followerId, @RequestParam String followingId) {
        //id is null
        if(followerId == null || followerId.isEmpty() || followingId == null || followingId.isEmpty()) {
            return JSONResult.errorCustom(ResponseStatusEnum.FAILED);
        }

        //user cannot follow himself
        if(followerId.toLowerCase().equals(followingId.toLowerCase())) {
            return JSONResult.errorCustom(ResponseStatusEnum.CAN_NOT_FOLLOW_SELF);
        }

        //no follower in db
        Users follower = userService.queryUser(followerId);
        if(follower == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }

        //no following in db
        Users following = userService.queryUser(followingId);
        if(following == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }

        followerService.doFollow(followerId, followingId);

        return JSONResult.ok();
    }

    @PostMapping("unfollow")
    @ApiOperation("a follower unfollows a following ")
    public JSONResult unfollow(@RequestParam String followerId, @RequestParam String followingId) {

        followerService.unFollow(followerId, followingId);

        return JSONResult.ok();
    }

    @PostMapping("checkFollow")
    @ApiOperation("check if follower follows following")
    public JSONResult checkFollow(@RequestParam String followerId, @RequestParam String followingId) {
        return followerService.checkFollow(followerId, followingId)? JSONResult.ok(ResponseStatusEnum.ALREADY_FOLLOW)
                : JSONResult.ok(ResponseStatusEnum.HAS_NOT_FOLLOW);
    }

    @GetMapping("listFollower")
    @ApiOperation("list all followers of an user")
    public JSONResult listFollower(@RequestParam String userId) {
        List<ListFollowerVO> listFollowerVOs = followerService.listFollower(userId);
        if(listFollowerVOs != null && listFollowerVOs.size() != 0) {
            return JSONResult.ok(listFollowerVOs);
        }
        return JSONResult.errorCustom(ResponseStatusEnum.NO_FOLLOWERS);
    }

    @GetMapping("listFollowing")
    @ApiOperation("list all followings of an user")
    public JSONResult listFollowing(@RequestParam String userId) {
        List<ListFollowerVO> listFollowerVOs = followerService.listFollowing(userId);
        if(listFollowerVOs != null && listFollowerVOs.size() != 0) {
            return JSONResult.ok(listFollowerVOs);
        }
        return JSONResult.errorCustom(ResponseStatusEnum.NO_FOLLOWINGS);
    }
}
