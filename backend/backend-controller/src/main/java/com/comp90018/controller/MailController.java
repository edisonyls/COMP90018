package com.comp90018.controller;

import com.comp90018.bo.SignUpBO;
import com.comp90018.enums.RedisEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.pojo.Users;
import com.comp90018.service.MailService;
import com.comp90018.service.UserService;
import com.comp90018.utils.IPUtil;
import com.comp90018.utils.RedisOperator;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@RestController
@Slf4j
@Api(tags = "mail controller")
@RequestMapping("verify")
public class MailController {

    @Autowired
    RedisOperator redis;

    @Autowired
    MailService mailService;

    @Autowired
    UserService userService;

    @PostMapping("/sendMail")
    public JSONResult send(@RequestParam String email, HttpServletRequest httpServletRequest) {
        if(email == null || email.length() == 0) {
            return JSONResult.errorCustom(ResponseStatusEnum.FAILED);
        }
        String ip = IPUtil.getRequestIp(httpServletRequest);
        log.info(RedisEnum.REDIS_IP + ip);
        redis.set(RedisEnum.REDIS_IP + ip, ip, 30);

        mailService.sendMailMessage(email);
        return JSONResult.ok(email);
    }

    @PostMapping("/signup")
    public JSONResult signUp(@Valid@RequestBody SignUpBO signUpBO) {
        String code = signUpBO.getCode();
        String email = signUpBO.getEmail();
        String username = signUpBO.getUsername();
        String password = signUpBO.getPassword();

        String redisCode = redis.get(RedisEnum.REDIS_CODE + email);
        if(redisCode == null || redisCode.length() == 0 || !redisCode.equals(code)) {
            return JSONResult.errorCustom(ResponseStatusEnum.WRONG_CODE);
        }
        Users user = userService.createUser(email, username, password);
        redis.del(RedisEnum.REDIS_CODE + email);

        return JSONResult.ok(user);
    }
}
