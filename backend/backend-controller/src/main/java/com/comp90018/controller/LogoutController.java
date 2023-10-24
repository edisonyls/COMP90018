package com.comp90018.controller;


import com.comp90018.jsonResult.JSONResult;
import com.comp90018.jsonResult.ResponseStatusEnum;
import com.comp90018.pojo.Users;
import com.comp90018.service.UserService;
import com.comp90018.utils.RedisOperator;
import com.comp90018.vo.UserVO;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

import static com.comp90018.ConstantEnum.REDIS_TOKEN;

@RestController
@Slf4j
@Api(tags = "logout controller")
@RequestMapping("settings")
public class LogoutController {

    @Autowired
    RedisOperator redis;

    @PostMapping("/logout")
    public JSONResult logout(@RequestParam String usrId, HttpServletRequest httpServletRequest) {
        redis.del(REDIS_TOKEN + usrId);
        return JSONResult.ok();
    }
}
