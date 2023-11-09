package com.comp90018.impl;

import com.comp90018.dto.Message;
import com.comp90018.enums.MessageTypeEnum;
import com.comp90018.enums.RedisEnum;
import com.comp90018.mongoDao.MessageDao;
import com.comp90018.pojo.Users;
import com.comp90018.service.MessageService;
import com.comp90018.service.UserService;
import com.comp90018.utils.RedisOperator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private RedisOperator redis;
    @Autowired
    private UserService userService;
    @Autowired
    private MessageDao messageDao;
    @Override
    public Message createMessage(String senderId, String receiverId, Integer type, Map content) {
        Users sender = userService.queryUser(senderId);
        Users receiver = userService.queryUser(receiverId);

        if(sender == null || receiver == null) {
            return null;
        }

        Message message = new Message(senderId, sender.getNickname(), sender.getProfile(),
                                receiverId, receiver.getNickname(), receiver.getProfile(),
                                type, content, new Date());
        messageDao.save(message);
        String s = redis.get(RedisEnum.REDIS_HASH.getRedisKey() + receiverId);
        if(s == null || s.length() == 0) {
            redis.set(RedisEnum.REDIS_HASH.getRedisKey() + receiverId, String.valueOf(1));
        }else {
            redis.set(RedisEnum.REDIS_HASH.getRedisKey() + receiverId, String.valueOf(Integer.parseInt(s) + 1));
        }

        return message;
    }

    @Override
    public List<Message> listAllNotification(String userId) {
        List<Message> messageList = messageDao.findAllByReceiverIdOrderByTimeDesc(userId);
        List<Message> newList = new ArrayList<>();
//        for (Message message : messageList) {
//            if (message.getType() == MessageTypeEnum.SYSTEM_MESSAGE.getType()) {
//                newList.add(message);
//            }
//        }
//        return newList;
        return messageList;
    }

    /**
     * list chat information between two users
     * @param userId
     * @param contactId
     * @return
     */
    @Override
    public List<Message> listMessagesWithOne(String userId, String contactId) {
        List<Message> list = messageDao.findAllBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimeAsc(userId, contactId, contactId, userId);
        List<Message> newList = new ArrayList<>();
        for (Message message : list) {
            if (message.getType() == MessageTypeEnum.USER_MESSAGE.getType()) {
                newList.add(message);
            }
        }
        return newList;
    }


}
