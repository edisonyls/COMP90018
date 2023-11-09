package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * sex enum
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum SexEnum {
    MAN(0),
    WOMAN(1),
    OTHER(2);
    private int sex;
}
