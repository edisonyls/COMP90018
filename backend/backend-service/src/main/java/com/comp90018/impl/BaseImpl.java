package com.comp90018.impl;

import com.comp90018.idworker.Sid;
import com.comp90018.mapper.CommentMapper;
import com.comp90018.mapper.PostMapper;
import com.comp90018.mapper.UsersMapper;
import com.comp90018.service.MessageService;
import com.comp90018.service.UserService;
import com.comp90018.utils.RedisOperator;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaseImpl {
    @Autowired
    public MessageService messageService;

    @Autowired
    public RabbitTemplate rabbitTemplate;

    @Autowired
    public RedisOperator redis;
    @Autowired
    public UserService userService;
    @Autowired
    public Sid sid;
}
