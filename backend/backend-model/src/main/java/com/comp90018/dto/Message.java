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
    @Field("senderPicture")
    private String senderPicture;

    @Field("receiverId")
    private String receiverId;
    @Field("receiverNickname")
    private String receiverNickname;
    @Field
    private String receiverPicture;

    @Field("type")
    private Integer type;
    @Field("content")
    private Map content;
    @Field("time")
    private Date time;
}
