package com.comp90018.impl;

import com.comp90018.dto.CommentDTO;
import com.comp90018.idworker.Sid;
import com.comp90018.mapper.CommentMapper;
import com.comp90018.mapper.PostMapper;
import com.comp90018.pojo.Comment;
import com.comp90018.pojo.Post;
import com.comp90018.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private Sid sid;


    @Override
    @Transactional
    public Comment createComment(CommentDTO commentDTO) {
        String postId = commentDTO.getPostId();
        String posterId = commentDTO.getPosterId();
        Example example = new Example(Post.class);
        example.createCriteria().andEqualTo("id", postId).andEqualTo("posterId", posterId);
        List<Post> postList =  postMapper.selectByExample(example);
        if (postList.isEmpty() || postList == null) {
            return null;
        }
        else {
            Comment comment = new Comment();
            String fatherCommentId = commentDTO.getFatherCommentId();
            if (fatherCommentId == null) {
                comment.setFatherCommentId("-1");
            }
            comment.setCommentUserId(commentDTO.getCommentUserId());
            String commentId = sid.nextShort();
            comment.setId(commentId);
            Date date = new Date();
            comment.setCreateTime(date);
            comment.setPosterId(posterId);
            comment.setPostId(postId);
            comment.setLikeCounts(0);
            comment.setContent(commentDTO.getContent());
            comment.setFatherCommentId(commentDTO.getFatherCommentId());
            commentMapper.insert(comment);
            return comment;
        }
    }

    @Override
    public boolean deleteComment(String commentId) {
        Example example = new Example(Comment.class);
        example.createCriteria().andEqualTo("id", commentId);
        List<Comment> commentList = commentMapper.selectByExample(example);
        if (commentList.isEmpty() || commentList == null) {
            return false;
        }
        else {
            Comment comment = commentList.get(0);
            commentMapper.delete(comment);
            return true;
        }
    }

    @Override
    public Comment likeComment(String commentId, String userId) {
        Example example = new Example(Comment.class);
        example.createCriteria().andEqualTo("id", commentId);
        List<Comment> commentList = commentMapper.selectByExample(example);
        if (commentList.isEmpty() || commentList == null) {
            return null;
        } else {
            Comment comment = commentList.get(0);
            comment.setLikeCounts(comment.getLikeCounts() + 1);
            return comment;
        }
    }

    @Override
    public List<CommentDTO> getCommentsWithHierarchy(String postId) {

        Example example = new Example(Comment.class);
        example.createCriteria().andEqualTo("postId", postId);
        List<Comment> commentList = commentMapper.selectByExample(example);

        if (commentList.isEmpty()) {
            return null;
        }

        Map<String, CommentDTO> commentDTOMap = new HashMap<>();
        for (Comment comment : commentList) {
            CommentDTO commentDTO = convertToDTO(comment);
            commentDTOMap.put(commentDTO.getId(), commentDTO);
        }

        for(CommentDTO commentDTO : commentDTOMap.values()) {
            if (commentDTO.getFatherCommentId() != null) {
                CommentDTO parentCommentDTO = commentDTOMap.get(commentDTO.getFatherCommentId());
                if (parentCommentDTO != null) {
                    parentCommentDTO.addReply(commentDTO);
                }
            }
        }


        List<CommentDTO> commentDTOList = commentDTOMap.values().stream()
                .peek(dto -> log.info("Processing DTO with ID: {} and fatherID: {}", dto.getId(), dto.getFatherCommentId())) // 调试输出每个DTO
                .filter(commentDTO -> commentDTO.getFatherCommentId().equals("-1")) // 确保过滤逻辑正确
                .collect(Collectors.toList());
        System.out.println(commentDTOList);
        return commentDTOList;
//        return commentDTOMap.values().stream()
//                .filter(commentDTO -> commentDTO.getFatherCommentId() == null)
//                .collect(Collectors.toList());
    }

    private CommentDTO convertToDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setPosterId(comment.getPosterId());
        dto.setCommentUserId(comment.getCommentUserId());
        dto.setContent(comment.getContent());
        dto.setFatherCommentId(comment.getFatherCommentId());
        dto.setLikeCounts(comment.getLikeCounts());
        dto.setPostId(comment.getPostId());
        dto.setCreateTime(comment.getCreateTime());

        dto.setReplies(new ArrayList<>());
        return dto;
    }


}
