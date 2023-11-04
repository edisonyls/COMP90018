package com.comp90018.controller;

import com.comp90018.bo.SignUpBO;
import com.comp90018.enums.RedisEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.pojo.Users;
import com.comp90018.service.MailService;
import com.comp90018.utils.IPUtil;
import com.comp90018.vo.UserVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.UUID;


@RestController
@Slf4j
@Api(tags = "login controller")
@RequestMapping("login")
public class LogInOutController extends BaseController{

    @Autowired
    MailService mailService;

    @PostMapping("/sendMail")
    @ApiOperation("send verify email when registering")
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

    @ApiOperation("register by username, password, email and verify code")
    @PostMapping("/register")
    public JSONResult signUp(@Valid @RequestBody SignUpBO signUpBO) {
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
    @ApiOperation("login by email and password")
    @PostMapping("/login")
    public JSONResult login(@RequestParam String email, @RequestParam String password, HttpServletRequest httpServletRequest) {

        Users user = userService.queryUserIsExistByEmailAndPassword(email, password);
        if(user == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }

        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        String userToken = UUID.randomUUID().toString();
        userVO.setUserToken(userToken);

        redis.set(RedisEnum.REDIS_TOKEN + userVO.getId(), userToken, 60 * 60 * 24 * 7);

        return JSONResult.ok(userVO);
    }

    @ApiOperation("logout by userId")
    @PostMapping("/logout")
    public JSONResult logout(@RequestParam String usrId, HttpServletRequest httpServletRequest) {
        if(!redis.keyIsExist(RedisEnum.REDIS_TOKEN + usrId)) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_LOGIN);
        }
        redis.del(RedisEnum.REDIS_TOKEN + usrId);
        return JSONResult.ok();
    }
}
