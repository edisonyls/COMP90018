package com.comp90018.controller;


import com.comp90018.bo.ChatBO;
import com.comp90018.dto.Message;
import com.comp90018.enums.MessageContentEnum;
import com.comp90018.enums.MessageTypeEnum;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.service.MessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@Slf4j
@Api(tags = "message controller")
@RequestMapping("message")
public class MessageController extends BaseController{
    @Autowired
    private MessageService messageService;
    @PostMapping("/sendMessage")
    @ApiOperation("sender sends a message to receiver")
    public JSONResult list(@RequestParam String senderId, @RequestParam String receiverId, @RequestParam String content, HttpServletRequest httpServletRequest) {
        if(senderId == null || receiverId == null || senderId.equals(receiverId)) {
            return JSONResult.errorCustom(ResponseStatusEnum.MESSAGE_SEND_FAIL);
        }

        HashMap<String, String> contentMap = new HashMap<>();
        contentMap.put(MessageContentEnum.DETAIL.getSystemMessage(), content);
        Message message = messageService.createMessage(senderId, receiverId, MessageTypeEnum.USER_MESSAGE.getType(), contentMap);

        if(message != null) {
            return JSONResult.ok(message);
        }

        return JSONResult.errorCustom(ResponseStatusEnum.MESSAGE_SEND_FAIL);
    }

    @PostMapping("/listNotifications")
    @ApiOperation("list all notifications of an user")
    public JSONResult list(@RequestParam String userId, HttpServletRequest httpServletRequest) {
        if (userId == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }

        List<Message> messages = messageService.listAllNotification(userId);
        if (messages == null || messages.size() == 0) {
            return JSONResult.errorCustom(ResponseStatusEnum.NO_MESSAGES);
        }

        return JSONResult.ok(messages);
    }

    @PostMapping("/listChat")
    @ApiOperation("list messages with an user")
    public JSONResult listChat(@RequestBody ChatBO chatBO) {
        String userId = chatBO.getUserId();
        String contactId = chatBO.getContactId();
        if (userId == null || contactId == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }

        List<Message> messages = messageService.listMessagesWithOne(userId, contactId);
        if (messages == null || messages.size() == 0) {
            return JSONResult.errorCustom(ResponseStatusEnum.NO_MESSAGES);
        }

        return JSONResult.ok(messages);
    }

}
