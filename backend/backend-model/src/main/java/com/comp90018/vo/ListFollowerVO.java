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
    private String picture;
    private String description;

    private boolean isFriendOfMine;

}
