package com.comp90018.controller;

import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import com.comp90018.service.FollowerService;
import com.comp90018.vo.ListFollowerVO;
import io.swagger.annotations.Api;
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

        return JSONResult.ok();
    }

    @PostMapping("unfollow")
    public JSONResult unfollow(@RequestParam String id, @RequestParam String posterId) {

        followerService.unFollow(id, posterId);

        return JSONResult.ok();
    }

    @PostMapping("checkfollow")
    public JSONResult checkFollow(@RequestParam String id, @RequestParam String posterId) {
        return followerService.checkFollow(id, posterId)? JSONResult.ok(ResponseStatusEnum.ALREADY_FOLLOW)
                : JSONResult.ok(ResponseStatusEnum.HAS_NOT_FOLLOW);
    }

    @GetMapping("listfollower")
    public JSONResult listFollower(@RequestParam String id) {
        List<ListFollowerVO> listFollowerVOs = followerService.listFollower(id);
        if(listFollowerVOs != null) {
            return JSONResult.ok(listFollowerVOs);
        }
        return JSONResult.errorCustom(ResponseStatusEnum.NO_FOLLOWERS);
    }
    @GetMapping("listfollowing")
    public JSONResult listFollowing(@RequestParam String id) {
        List<ListFollowerVO> listFollowerVOs = followerService.listFollowing(id);
        if(listFollowerVOs != null) {
            return JSONResult.ok(listFollowerVOs);
        }
        return JSONResult.errorCustom(ResponseStatusEnum.NO_FOLLOWINGS);
    }
}
