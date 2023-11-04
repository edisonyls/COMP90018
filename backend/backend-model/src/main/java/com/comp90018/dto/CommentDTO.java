package com.comp90018.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {

    private String id;
    private String posterId;
    private String postId;
    private String fatherCommentId;
    private String commentUserId;
    private String content;
    private Integer likeCounts;
    private Date createTime;
    private List<CommentDTO> replies;

    public void addReply(CommentDTO reply) {
        this.replies.add(reply);
    }

}
