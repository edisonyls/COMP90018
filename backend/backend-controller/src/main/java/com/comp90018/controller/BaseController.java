package com.comp90018.controller;

import com.comp90018.service.UserService;
import com.comp90018.utils.RedisOperator;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseController {

    @Autowired
    RedisOperator redis;

    @Autowired
    UserService userService;
}
