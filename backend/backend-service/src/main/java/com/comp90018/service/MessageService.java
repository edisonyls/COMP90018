package com.comp90018.service;

import java.util.Map;

public interface MessageService {
    public void createMessage(String senderId, String receiverId, Integer type, Map content);
}
