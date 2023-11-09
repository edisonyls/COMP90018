package com.comp90018.controller;

import com.comp90018.enums.RedisEnum;
import com.comp90018.jsonResult.JSONResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Api(tags = "query new messages controller")
@RequestMapping("newMsg")
public class NewMsgController extends BaseController{
    @PostMapping("/query")
    @ApiOperation("query")
    public JSONResult queryNewMsg(@RequestParam String userId) {
        String s = redis.get(RedisEnum.REDIS_HASH.getRedisKey() + userId);
        if(s == null || s.length() == 0) {
            return JSONResult.ok("0");
        }else {
            redis.del(RedisEnum.REDIS_HASH.getRedisKey() + userId);
            return JSONResult.ok(s);
        }
    }
}
