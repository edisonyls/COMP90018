package com.comp90018.mapper;


import com.comp90018.my.mapper.MyMapper;
import com.comp90018.pojo.Post;
import org.springframework.stereotype.Repository;

@Repository
public interface PostMapper extends MyMapper<Post> {
}