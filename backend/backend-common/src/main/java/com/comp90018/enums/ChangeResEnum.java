package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * change user password controller result enum class
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ChangeResEnum {
    ORIGINAL_PASSWORD_IS_WRONG("original password is wrong!"),
    NEW_PASSWORD_IS_SAME_WITH_ORIGINAL_PASSWORD("new password is same with original password!"),
    USERID_IS_WRONG("user id is wrong"),
    CHANGE_SUCCESS("change success"),
    CHANGE_FAIL("change fail")
    ;
    private String changeRes;
}
