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
public class ChatBO {

    @NotBlank(message = "userId is null")
    private String userId;

    @NotBlank(message = "contactId is null")
    private String contactId;
}
