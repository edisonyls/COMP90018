package com.comp90018.controller;

import com.comp90018.enums.RedisEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import com.comp90018.service.UserService;
import com.comp90018.utils.RedisOperator;
import com.comp90018.vo.UserVO;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Api(tags = "query controller")
@RequestMapping("query")
public class QueryUserInfoController extends BaseController{

    @GetMapping("userInfo")
    public JSONResult queryUserInfo(@RequestParam String userId) {
        Users user = userService.queryUser(userId);
        UserVO usersVO = new UserVO();
        BeanUtils.copyProperties(usersVO, usersVO);

        int myFollows = StringUtils.isBlank(redis.get(RedisEnum.REDIS_FOLLOW + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_FOLLOW + userId));
        int myFans = StringUtils.isBlank(redis.get(RedisEnum.REDIS_FAN + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_FAN + userId));
        int myVlogLikes = StringUtils.isBlank(redis.get(RedisEnum.REDIS_VLOG_LIKES + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_VLOG_LIKES + userId));
        int myCommentLikes = StringUtils.isBlank(redis.get(RedisEnum.REDIS_COMMENT_LIKES + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_COMMENT_LIKES + userId));

        usersVO.setMyFollows(myFollows);
        usersVO.setMyFans(myFans);
        usersVO.setMyVlogLikes(myVlogLikes);
        usersVO.setMyCommentLikes(myCommentLikes);

        return JSONResult.ok(usersVO);
    }
}
