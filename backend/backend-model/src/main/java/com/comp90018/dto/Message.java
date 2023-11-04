package com.comp90018.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.Map;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document("message")
public class Message {

    @Id
    private String id;

    @Field("senderId")
    private String senderId;
    @Field("senderNickname")
    private String senderNickname;
    @Field("senderProfile")
    private String senderProfile;

    @Field("receiverId")
    private String receiverId;
    @Field("receiverNickname")
    private String receiverNickname;
    @Field("receiverProfile")
    private String receiverProfile;

    @Field("type")
    private Integer type;
    @Field("content")
    private Map content;
    @Field("time")
    private Date time;

    public Message(String senderId, String senderNickname, String senderProfile, String receiverId, String receiverNickname, String receiverProfile, Integer type, Map content, Date time) {
        this.senderId = senderId;
        this.senderNickname = senderNickname;
        this.senderProfile = senderProfile;
        this.receiverId = receiverId;
        this.receiverNickname = receiverNickname;
        this.receiverProfile = receiverProfile;
        this.type = type;
        this.content = content;
        this.time = time;
    }
}
