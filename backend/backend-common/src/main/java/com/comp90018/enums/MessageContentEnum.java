package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum MessageContentEnum {
    BEHAVIOR("behavior"),
    FOLLOW_NOTIFY("follow"),
    UNFOLLOW_NOTIFY("unfollow"),
    POST_LIKE_NOTIFY("like post"),
    COMMENT_LIKE_NOTIFY("like comment"),
    UNLIKE_NOTIFY("unlike"),
    COMMENT_NOTIFY("comment"),
    DETAIL("detail")
    ;

    private String systemMessage;
}
