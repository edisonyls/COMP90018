package com.comp90018.service;

import com.comp90018.dto.MessageDTO;

import java.util.List;
import java.util.Map;

public interface MessageService {

    //create a system message or user message
    MessageDTO createMessage(String senderId, String receiverId, Integer type, Map content);

    //list all messages of an user
    List<MessageDTO> listAllNotification(String userId);

    //list messages between two
    List<MessageDTO> listMessagesWithOne(String userId, String contactId);
}
