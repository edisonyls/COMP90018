package com.comp90018.impl;

import com.comp90018.idworker.Sid;
import com.comp90018.mapper.PostMapper;
import com.comp90018.pojo.Post;
import com.comp90018.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private Sid sid;

    @Override
    public Post createPetMissingPost(String userId, String postImg, int postType, String petCategory, String petBread, String petName, String contactNumber, String title, String description, Double latitude, Double longitude, String rewards) {
        Post post = new Post();
        String postId = sid.nextShort();
        post.setId(postId);
        post.setPicture(postImg);
        post.setPosterId(userId);
        post.setPostType(postType);
        post.setPetCategory(petCategory);
        post.setPetBread(petBread);
        post.setPetName(petName);
        post.setLatitude(latitude);
        post.setLongitude(longitude);
        post.setRewards(rewards);
        post.setContactNum(contactNumber);
        post.setDescription(description);
        post.setTitle(title);
        return null;
    }

    @Override
    public Post createFoundAPetPost(String userId, String postImg, int postType, String petCategory, String petBread, String petName, String contactNumber, String title, String description, Double latitude, Double longitude) {
        Post post = new Post();
        String postId = sid.nextShort();
        post.setId(postId);
        post.setPicture(postImg);
        post.setPosterId(userId);
        post.setPostType(postType);
        post.setPetCategory(petCategory);
        post.setPetBread(petBread);
        post.setPetName(petName);
        post.setContactNum(contactNumber);
        post.setTitle(title);
        post.setDescription(description);
        post.setLatitude(latitude);
        post.setLongitude(longitude);
        return null;
    }

    @Override
    public Post createGeneralPost(String userId, String postImg, int postType, String title, String description, Double latitude, Double longitude, String tag) {
        Post post = new Post();
        String postId = sid.nextShort();
        post.setId(postId);
        post.setPicture(postImg);
        post.setPosterId(userId);
        post.setTitle(title);
        post.setDescription(description);
        post.setLatitude(latitude);
        post.setLongitude(longitude);
        post.setPostType(postType);
        post.setTag(tag);
        return null;
    }

    @Override
    public List<Post> getAllPost() {
        List<Post> postList = postMapper.selectAll();
        return new ArrayList<>(postList);
    }

    @Override
    public List<Post> getAllPostPerUser(String userId) {
        Example example = new Example(Post.class);
        example.createCriteria().andEqualTo("posterId", userId);
        return postMapper.selectByExample(example);
    }
}
