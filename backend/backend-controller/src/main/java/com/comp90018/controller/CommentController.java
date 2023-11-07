package com.comp90018.controller;
import com.comp90018.dto.CommentDTO;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Comment;
import com.comp90018.service.CommentService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@Api(tags = "comment")
@RequestMapping("comment")
public class CommentController extends BaseController{

    @Autowired
    CommentService commentService;

    @PostMapping("/AddComment")
    public JSONResult addComment(@RequestBody CommentDTO commentDTO) {
        Comment comment = commentService.createComment(commentDTO);
        if (comment == null) {
            return JSONResult.errorMsg("No such post.");
        }
        else {
            return JSONResult.ok(comment);
        }
    }

    @PostMapping("/DeleteComment")
    public JSONResult deleteComment(@RequestParam String commentId) {
        boolean result = commentService.deleteComment(commentId);
        if (result == false) {
            return JSONResult.errorMsg("No such comment.");
        } else {
            return JSONResult.ok();
        }
    }

    @GetMapping("/GetCommentList")
    public JSONResult getCommentList(@RequestParam String postId) {
        List<CommentDTO> commentDTOList = commentService.getCommentsWithHierarchy(postId);
        return JSONResult.ok(commentDTOList);
    }

    @GetMapping("/LikeAComment")
    public JSONResult likeAComment(@RequestParam String commentId, String userId) {
        Comment comment = commentService.likeComment(commentId, userId);
        if (comment == null) {
            return JSONResult.errorMsg("No such comment.");
        } else {
            return JSONResult.ok(comment);
        }
    }




}
