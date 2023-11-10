package com.comp90018.service;


import com.comp90018.bo.MessageConvertBO;
import com.comp90018.enums.MessageContentEnum;
import com.comp90018.enums.MessageTypeEnum;
import com.comp90018.utils.JsonUtils;
import com.comp90018.utils.RabbitMQUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RabbitMQConsumer {

    @Autowired
    private MessageService messageService;

    @RabbitListener(queues = {RabbitMQUtils.QUEUE_SYS_MSG})
    public void watchQueue(String payload, Message message) {
        String routingKey = message.getMessageProperties().getReceivedRoutingKey();
        MessageConvertBO messageConvertBO = JsonUtils.jsonToPojo(payload, MessageConvertBO.class);
        if (("sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.FOLLOW_NOTIFY.getSystemMessage()).equals(routingKey)
                || ("sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.UNFOLLOW_NOTIFY.getSystemMessage()).equals(routingKey)
                || ("sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.COMMENT_NOTIFY.getSystemMessage()).equals(routingKey)
                || ("sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.COMMENT_LIKE_NOTIFY.getSystemMessage()).equals(routingKey)
                || ("sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.POST_UNLIKE_NOTIFY.getSystemMessage()).equals(routingKey)
                || ("sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.POST_LIKE_NOTIFY.getSystemMessage()).equals(routingKey)) {
            log.info("mq new message consumes");
            messageService.createMessage(messageConvertBO.getSenderId(), messageConvertBO.getReceiverId(), messageConvertBO.getType(), messageConvertBO.getContent());
        }
    }
}
