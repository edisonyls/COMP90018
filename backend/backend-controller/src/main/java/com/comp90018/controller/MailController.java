package com.comp90018.controller;

import com.comp90018.Mail;
import com.comp90018.bo.SignUpBO;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.jsonResult.ResponseStatusEnum;
import com.comp90018.pojo.Users;
import com.comp90018.service.MailService;
import com.comp90018.service.UserService;
import com.comp90018.utils.IPUtil;
import com.comp90018.utils.RedisOperator;
import com.comp90018.vo.UserVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import static com.comp90018.ConstantEnum.REDIS_CODE;
import static com.comp90018.ConstantEnum.REDIS_IP;

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
    public JSONResult send(@RequestParam String email, HttpServletRequest request) {
        if(email == null || email.length() == 0) {
            return JSONResult.errorCustom(ResponseStatusEnum.FAILED);
        }
        String ip = IPUtil.getRequestIp(request);
        log.info(REDIS_IP + ip);
        redis.set(REDIS_IP + ip, ip, 30);

        mailService.sendMailMessage(email);
        return JSONResult.ok(email);
    }

    @PostMapping("/signup")
    public JSONResult signUp(@Valid@RequestBody SignUpBO signUpBO) {
        String code = signUpBO.getCode();
        String email = signUpBO.getEmail();
        String username = signUpBO.getUsername();
        String password = signUpBO.getPassword();

        String redisCode = redis.get(REDIS_CODE + email);
        if(redisCode == null || redisCode.length() == 0 || !redisCode.equals(code)) {
            return JSONResult.errorCustom(ResponseStatusEnum.WRONG_CODE);
        }
        Users user = userService.createUser(email, username, password);
        redis.del(REDIS_CODE + email);

        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);

        return JSONResult.ok(userVO);
    }
}
