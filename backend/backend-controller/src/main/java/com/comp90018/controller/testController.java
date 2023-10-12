package com.comp90018.controller;

import com.comp90018.jsonResult.JSONResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    @GetMapping("test")
    public JSONResult test() {
        return JSONResult.ok();
    }
}
