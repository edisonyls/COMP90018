package com.comp90018.controller;

import com.comp90018.jsonResult.JSONResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Api(tags = "test controller api")
public class testController {

    @ApiOperation(value = "test route")
    @GetMapping("test")
    public JSONResult test() {
        return JSONResult.ok();
    }
}
