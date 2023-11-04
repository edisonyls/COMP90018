package com.comp90018.service;

import com.comp90018.dto.CommentDTO;
import com.comp90018.pojo.Comment;

import java.util.List;

public interface CommentService {

    Comment createComment(CommentDTO commentDTO);

    boolean deleteComment(String commentId);

    Comment likeComment(String commentId, String userId);

    List<CommentDTO> getCommentsWithHierarchy(String postId);

}
