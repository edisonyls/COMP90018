package com.comp90018.impl;

import com.comp90018.bo.UploadPostBO;
import com.comp90018.enums.PostPrivateLevelEnum;
import com.comp90018.enums.PostTypeEnum;
import com.comp90018.idworker.Sid;
import com.comp90018.mapper.PostMapper;
import com.comp90018.pojo.Post;
import com.comp90018.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private Sid sid;

    @Override
    @Transactional
    public Post createPost(UploadPostBO uploadPostBO) {
        Post post = new Post();
        post.setLikesCounts(0);
        post.setCommentsCounts(0);
        post.setPrivateLevel(0);
        post.setPrivateLevel(PostPrivateLevelEnum.PUBLIC.getPrivateLevel());

        String postId = sid.nextShort();
        uploadPostBO.setPostId(postId);
        Date date = new Date();
        post.setCreatedTime(date);
        post.setUpdatedTime(date);
        post.setId(postId);
        if (uploadPostBO.getPostImg() == null || uploadPostBO.getUserId() == null
        || uploadPostBO.getLatitude() == null || uploadPostBO.getLongitude() == null
        || uploadPostBO.getPostType() == null) {
            return null;
        }
        post.setPrivateLevel(uploadPostBO.getPrivateLevel());
        post.setPicture(uploadPostBO.getPostImg());
        post.setPosterId(uploadPostBO.getUserId());
        post.setLongitude(uploadPostBO.getLongitude());
        post.setLatitude(uploadPostBO.getLatitude());
        String location = uploadPostBO.getLocation();
        if (location == null) {
            uploadPostBO.setLocation("Default");
        } else {
            post.setLocation(location);
        }
        String postType = uploadPostBO.getPostType();
        switch (postType) {
            case "0":
                if (uploadPostBO.getDescription() == null || uploadPostBO.getTitle() == null
                        || uploadPostBO.getPetName() == null  || uploadPostBO.getPetCategory() == null
                        || uploadPostBO.getPetBread() == null  || uploadPostBO.getRewards() == null
                        || uploadPostBO.getContactNumber() == null ) {
                    return null;
                }
                post.setDescription(uploadPostBO.getDescription());
                post.setTitle(uploadPostBO.getTitle());
                post.setPetName(uploadPostBO.getPetName());
                post.setPetCategory(uploadPostBO.getPetCategory());
                post.setPetBread(uploadPostBO.getPetBread());
                post.setRewards(uploadPostBO.getRewards());
                post.setContactNum(uploadPostBO.getContactNumber());
                post.setPostType(PostTypeEnum.MISSING.getPostType());
                post.setTag("Default");
                post.setContent("Default");
                post.setSubject("Default");
                break;
            case "1":
                if (uploadPostBO.getDescription() == null || uploadPostBO.getTitle() == null
                        || uploadPostBO.getPetName() == null  || uploadPostBO.getPetCategory() == null
                        || uploadPostBO.getPetBread() == null || uploadPostBO.getContactNumber() == null ) {
                    return null;
                }
                post.setDescription(uploadPostBO.getDescription());
                post.setTitle(uploadPostBO.getTitle());
                post.setPetBread(uploadPostBO.getPetBread());
                post.setPetCategory(uploadPostBO.getPetCategory());
                post.setPetName(uploadPostBO.getPetName());
                post.setContactNum(uploadPostBO.getContactNumber());
                post.setPostType(PostTypeEnum.MISSING.getPostType());
                post.setTag("Default");
                post.setContent("Default");
                post.setSubject("Default");
                post.setRewards("Default");
                break;
            default:
                if (post.getContent() == null || post.getSubject() == null || post.getTag() == null) {
                    return null ;
                }
                post.setContent(uploadPostBO.getContent());
                post.setSubject(uploadPostBO.getSubject());
                post.setTag(uploadPostBO.getTag());
                post.setPostType(PostTypeEnum.GENERAL.getPostType());
                post.setDescription("Default");
                post.setTitle("Default");
                post.setPetBread("Default");
                post.setPetCategory("Default");
                post.setPetName("Default");
                post.setContactNum("Default");
                post.setRewards("Default");
                break;
        }
        postMapper.insert(post);
        return post;
    }

    @Override
    public List<Post> getAllPost(String postType) {
        Example example = new Example(Post.class);
        switch (postType) {
            case "Missing":
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC)
                        .andEqualTo("postType", PostTypeEnum.MISSING.getPostType());
                break;
            case "Found":
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC)
                        .andEqualTo("postType", PostTypeEnum.FOUND.getPostType());
                break;
            case "General":
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC)
                        .andEqualTo("postType", PostTypeEnum.GENERAL.getPostType());
                break;
            default:
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC);
                break;
        }
        List<Post> postList = postMapper.selectByExample(example);
        return new ArrayList<>(postList);
    }

    @Override
    public List<Post> getAllPostPerUser(String userId) {
        Example example = new Example(Post.class);
        example.createCriteria().andEqualTo("posterId", userId)
                .andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC);
        return postMapper.selectByExample(example);
    }

    @Override
    @Transactional
    public boolean deletedPost(String postId) {
        Example example = new Example(Post.class);
        example.createCriteria().andEqualTo("id", postId);
        List<Post> post = postMapper.selectByExample(example);
        if (post.isEmpty() || post == null) {
            return false;
        }
        else {
            postMapper.delete(post.get(0));
            return true;
        }
    }

    @Override
    @Transactional
    public Post updatePost(UploadPostBO uploadPostBO) {
        Example example = new Example(Post.class);
        example.createCriteria().andEqualTo("id", uploadPostBO.getPostId())
                .andEqualTo("posterId", uploadPostBO.getUserId());
        List<Post> postList = postMapper.selectByExample(example);
        if (postList.isEmpty() || postList == null) {
            return null;
        }
        else {
            Post post = postList.get(0);
            Date date = new Date();
            post.setUpdatedTime(date);
            BeanUtils.copyProperties(uploadPostBO, post);
            if (postMapper.updateByPrimaryKeySelective(post) == 0) {
                return null;
            }
            return post;
        }
    }

}
