package com.comp90018.controller;

import com.comp90018.enums.RedisEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.enums.ResponseStatusEnum;
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


@RestController
@Slf4j
@Api(tags = "login controller")
@RequestMapping("login")
public class LoginController extends BaseController{

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
}
