package com.comp90018.controller;

import com.comp90018.config.MinIOConfig;
import com.comp90018.service.UserService;
import com.comp90018.utils.RedisOperator;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * base class of other controller
 */
public class BaseController {
    @Autowired
    MinIOConfig minIOConfig;
    @Autowired
    RedisOperator redis;
    @Autowired
    UserService userService;
}
