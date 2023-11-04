package com.comp90018.controller;


import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Api(tags = "message controller")
@RequestMapping("message")
public class MessageController extends BaseController{
}
