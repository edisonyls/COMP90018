package com.comp90018.service;

import com.comp90018.dto.Message;

import java.util.List;
import java.util.Map;

public interface MessageService {
    public void createMessage(String senderId, String receiverId, Integer type, Map content);

    public List<Message> listAllMessage(String receiverId);
    public List<Message> listMessageWith1User();
}
