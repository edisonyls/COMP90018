package com.comp90018.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SendMsgBO {
    @NotBlank(message = "senderId is null")
    private String senderId;
    @NotBlank(message = "receiverId is null")
    private String receiverId;
    @NotBlank(message = "content is null")
    private String content;
}
