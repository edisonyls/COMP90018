package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum FriendEnum {
    NO(0),
    YES(1);
    private int friend;
}
