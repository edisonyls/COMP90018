package com.comp90018.controller;

import com.comp90018.bo.ChangeUserBO;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Api(tags = "changer user information controller")
@RequestMapping("settings")
public class ChangeUserInfoController extends BaseController{

    @PostMapping("/changeInfo")
    public JSONResult changeinfo(@RequestBody ChangeUserBO changeUserBO) {
        Users users = userService.changeUserInfo(changeUserBO);

        if(users == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.CHANGE_USER_INFO_FAIL);
        }
        return JSONResult.ok(users);
    }
}
