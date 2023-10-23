package com.comp90018.service;

import com.comp90018.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    JavaMailSender javaMailSender;
    public void sendMailMessage(String email) {

        String code = String.valueOf((int)((Math.random() * 9 + 1) * 100000));

        Mail mail = new Mail("comp90018@163.com", code, email, "verify code");
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(mail.getSender());
        simpleMailMessage.setTo(mail.getReceiver());
        simpleMailMessage.setSubject(mail.getTitle());
        simpleMailMessage.setText(mail.getCode());
        javaMailSender.send(simpleMailMessage);
    }
}
