package com.comp90018.service;

import com.comp90018.dto.Message;

import java.util.List;
import java.util.Map;

public interface MessageService {

    //create a system message or user message
    public Message createMessage(String senderId, String receiverId, Integer type, Map content);

    //list all messages of an user
    public List<Message> listAllMessage(String userId);
}
