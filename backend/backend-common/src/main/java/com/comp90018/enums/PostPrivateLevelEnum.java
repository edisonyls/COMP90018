package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * public means posts are shown to all users
 * private means only the owner can see
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum PostPrivateLevelEnum {

    PUBLIC(0),
    PRIVATE(1);

    private int privateLevel;
}
