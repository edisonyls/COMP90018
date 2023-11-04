package com.comp90018.bo;

import lombok.*;

import java.util.List;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommentBO {

    private String id;
    private String content;
    private String commentUserId;
    private Integer likeCounts;
    private List<CommentBO> replies;

}
