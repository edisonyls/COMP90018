package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum PostTypeEnum {
    MISSING(0),
    FOUND(1),
    GENERAL(2);
    private int postType;
}
