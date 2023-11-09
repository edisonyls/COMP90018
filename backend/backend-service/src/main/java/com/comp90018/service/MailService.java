package com.comp90018.service;

import com.comp90018.Mail;
import com.comp90018.enums.RedisEnum;
import com.comp90018.utils.RedisOperator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailService {

    @Autowired
    RedisOperator redis;

    @Autowired
    JavaMailSender javaMailSender;
    public void sendMailMessage(String email) {

        String code = String.valueOf((int)((Math.random() * 9 + 1) * 100000));
        redis.set(RedisEnum.REDIS_CODE + email, code, 600);
        log.info(code);

        Mail mail = new Mail("comp90018@163.com", code, email, "verify code");
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(mail.getSender());
        simpleMailMessage.setTo(mail.getReceiver());
        simpleMailMessage.setSubject(mail.getTitle());
        simpleMailMessage.setText(mail.getCode());
        javaMailSender.send(simpleMailMessage);
    }
}
