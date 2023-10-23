package com.comp90018.controller;

import com.comp90018.Mail;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.service.MailService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
@Api(tags = "mail controller")
@RequestMapping("verify")
public class MailController {

    @Autowired
    MailService mailService;

    @PostMapping("/sendMail")
    public JSONResult send(@RequestParam String email, HttpServletRequest request) {
        if(email == null || email.length() == 0) {
            return JSONResult.ok();
        }

        mailService.sendMailMessage(email);
        return JSONResult.ok(email);
    }
}
