package com.comp90018.controller;


import com.comp90018.enums.RedisEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.utils.RedisOperator;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
@Slf4j
@Api(tags = "logout controller")
@RequestMapping("settings")
public class LogoutController {

    @Autowired
    RedisOperator redis;

    @PostMapping("/logout")
    public JSONResult logout(@RequestParam String usrId, HttpServletRequest httpServletRequest) {
        if(!redis.keyIsExist(RedisEnum.REDIS_TOKEN + usrId)) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_LOGIN);
        }
        redis.del(RedisEnum.REDIS_TOKEN + usrId);
        return JSONResult.ok();
    }
}
