package com.comp90018.impl;

import com.comp90018.dto.Message;
import com.comp90018.mongoDao.MessageDao;
import com.comp90018.pojo.Users;
import com.comp90018.service.MessageService;
import com.comp90018.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private UserService userService;
    @Autowired
    private MessageDao messageDao;
    @Override
    public void createMessage(String senderId, String receiverId, Integer type, Map content) {
        Users sender = userService.queryUser(senderId);
        Users receiver = userService.queryUser(receiverId);
        messageDao.save(new Message(senderId, sender.getNickname(), sender.getProfile(),
                receiverId, receiver.getNickname(), receiver.getProfile(),
                type, content, new Date()));

    }

    @Override
    public List<Message> listAllMessage(String receiverId) {
        return null;
    }

    @Override
    public List<Message> listMessageWith1User() {
        return null;
    }
}
