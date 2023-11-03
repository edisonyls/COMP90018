package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum PostPrivateLevelEnum {

    PUBLIC(0),
    PRIVATE(1);

    private int privateLevel;
}
