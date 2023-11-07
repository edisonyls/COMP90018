package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum MessageContentEnum {
    BEHAVIOR("behavior"),
    FOLLOW_NOTIFY("Follow your account"),
    UNFOLLOW_NOTIFY("Unfollow your account"),
    POST_LIKE_NOTIFY("Like your post"),
    POST_UNLIKE_NOTIFY("Unlike your post"),
    COMMENT_LIKE_NOTIFY("Like your comment"),
    UNLIKE_NOTIFY("Unlike your comment"),
    COMMENT_NOTIFY("Comment your post"),
    DETAIL("Detail")
    ;

    private String systemMessage;
}
