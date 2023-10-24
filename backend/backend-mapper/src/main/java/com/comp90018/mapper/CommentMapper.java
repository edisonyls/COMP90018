package com.comp90018.mapper;


import com.comp90018.my.mapper.MyMapper;
import com.comp90018.pojo.Comment;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentMapper extends MyMapper<Comment> {
}