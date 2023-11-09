package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * message type enum
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum MessageTypeEnum {
    SYSTEM_MESSAGE(0),
    USER_MESSAGE(1);
    private Integer type;
}
