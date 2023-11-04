package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum SystemMessageEnum {
    BEHAVIOR("behavior"),
    FOLLOW_NOTIFY("follow"),
    UNFOLLOW_NOTIFY("unfollow")
    ;

    private String systemMessage;
}
