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
    UNFOLLOW_NOTIFY("unfollow"),
    LIKE_NOTIFY("like"),
    UNLIKE_NOTIFY("unlike"),
    COMMENT_NOTIFY("comment")
    ;

    private String systemMessage;
}
