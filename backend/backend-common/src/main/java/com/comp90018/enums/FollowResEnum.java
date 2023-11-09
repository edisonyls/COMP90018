package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * follow status and follow result enum
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum FollowResEnum {
    ALREADY_FOLLOW("already follow"),
    ALREADY_UNFOLLOW("already unfollow"),
    USER_CANNOT_NULL("user cannot null"),
    FOLLOW_SUCCESS("follow success"),
    UNFOLLOW_SUCCESS("unfollow success")
    ;
    private String res;
}
