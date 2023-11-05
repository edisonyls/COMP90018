package com.comp90018.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ListFollowerVO {
    private String id;
    private String nickname;
    private String profile;
    private String description;
    private boolean isFriendOfMine;

}
