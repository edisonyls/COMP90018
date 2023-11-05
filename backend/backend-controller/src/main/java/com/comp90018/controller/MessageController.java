package com.comp90018.controller;


import com.comp90018.dto.Message;
import com.comp90018.enums.MessageContentEnum;
import com.comp90018.enums.MessageTypeEnum;
import com.comp90018.enums.RedisEnum;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.service.MessageService;
import com.comp90018.utils.IPUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public JSONResult send(@RequestParam String senderId, @RequestParam String receiverId, @RequestParam String content, HttpServletRequest httpServletRequest) {
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

    @PostMapping("/listMessages")
    @ApiOperation("list all messages of an user")
    public JSONResult send(@RequestParam String userId, HttpServletRequest httpServletRequest) {
        if (userId == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_EXIST);
        }

        List<Message> messages = messageService.listAllMessage(userId);
        if (messages == null || messages.size() == 0) {
            return JSONResult.errorCustom(ResponseStatusEnum.NO_MESSAGES);
        }

        return JSONResult.ok(messages);
    }

}
