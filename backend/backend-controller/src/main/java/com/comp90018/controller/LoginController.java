package com.comp90018.controller;

import com.comp90018.jsonResult.JSONResult;
import com.comp90018.jsonResult.ResponseStatusEnum;
import com.comp90018.pojo.Users;
import com.comp90018.service.UserService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.spring.web.json.Json;

@RestController
@Slf4j
@Api(tags = "login controller")
@RequestMapping("login")
public class LoginController {

    @Autowired
    UserService userService;
    @PostMapping("/login")
    public JSONResult login(@RequestParam String email, @RequestParam String password) {

        Users user = userService.queryUserIsExistByEmailAndPassword(email, password);
        if(user == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }
        return JSONResult.ok(user);
    }
}
