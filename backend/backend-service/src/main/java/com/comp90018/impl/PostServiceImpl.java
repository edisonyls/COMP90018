package com.comp90018.impl;

import com.comp90018.bo.UploadPostBO;
import com.comp90018.enums.PostPrivateLevelEnum;
import com.comp90018.enums.PostTypeEnum;

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
public class PostServiceImpl extends BaseImpl implements PostService {

    @Autowired
    private PostMapper postMapper;


    @Override
    @Transactional
    public Post createPost(UploadPostBO uploadPostBO) {
        Post post = new Post();
        post.setLikesCounts(0);
        post.setCommentsCounts(0);
        post.setPrivateLevel(PostPrivateLevelEnum.PUBLIC.getPrivateLevel());

//        String postId = sid.nextShort();
        String postId = uploadPostBO.getPostId();
        uploadPostBO.setPostId(postId);
        Date date = new Date();
        post.setCreatedTime(date);
        post.setUpdatedTime(date);
        post.setId(postId);

        post.setPosterId(uploadPostBO.getUserId());

        post.setLatitude(uploadPostBO.getLatitude());
        post.setLongitude(uploadPostBO.getLongitude());
        post.setPicture(uploadPostBO.getPostImg());

        String title = uploadPostBO.getTitle();
        if (title == null) {
            title = postId;
        }
        post.setTitle(title);
        post.setPetCategory(uploadPostBO.getPetCategory());
        post.setPetBreed(uploadPostBO.getPetBreed());
        post.setPetName(uploadPostBO.getPetName());
        post.setLocation("Default");
        post.setContactNum(uploadPostBO.getContactNumber());
        post.setRewards(uploadPostBO.getRewards());
        post.setDescription(uploadPostBO.getDescription());
        post.setSubject(uploadPostBO.getSubject());
        post.setContent(uploadPostBO.getContent());
        post.setTag(uploadPostBO.getTag());
        post.setUpdatedTime(date);

        String postType = uploadPostBO.getPostType();
        switch (postType) {
            case "Missing":
                post.setPostType(PostTypeEnum.MISSING.getPostType());
                break;
            case "Found":
                post.setPostType(PostTypeEnum.FOUND.getPostType());
                break;
            default:
                post.setPostType(PostTypeEnum.GENERAL.getPostType());
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
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC.getPrivateLevel())
                        .andEqualTo("postType", PostTypeEnum.MISSING.getPostType());
                break;
            case "Found":
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC.getPrivateLevel())
                        .andEqualTo("postType", PostTypeEnum.FOUND.getPostType());
                break;
            case "General":
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC.getPrivateLevel())
                        .andEqualTo("postType", PostTypeEnum.GENERAL.getPostType());
                break;
            default:
                example.createCriteria().andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC.getPrivateLevel());
                break;
        }
        List<Post> postList = postMapper.selectByExample(example);
        return new ArrayList<>(postList);
    }

    @Override
    public List<Post> getAllPostPerUser(String userId) {
        Example example = new Example(Post.class);
        example.createCriteria().andEqualTo("posterId", userId)
                .andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC.getPrivateLevel());
        return postMapper.selectByExample(example);
    }

    /**
     * Can be filtered by category: Cat/Dog/All
     * @param petCategory
     * @return
     */
    @Override
    public List<Post> getFilteredPost(String petCategory) {
        Example example = new Example(Post.class);
        example.createCriteria().andEqualTo("petCategory", toTitleCase(petCategory))
                .andEqualTo("privateLevel", PostPrivateLevelEnum.PUBLIC.getPrivateLevel());
        return postMapper.selectByExample(example);
    }

    public static String toTitleCase(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }

        StringBuilder titleCase = new StringBuilder();
        boolean nextTitleCase = true;

        for (char c : input.toCharArray()) {
            if (Character.isSpaceChar(c)) {
                nextTitleCase = true;
            } else if (nextTitleCase) {
                c = Character.toTitleCase(c);
                nextTitleCase = false;
            } else {
                c = Character.toLowerCase(c);
            }

            titleCase.append(c);
        }

        return titleCase.toString();
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
        System.out.println(uploadPostBO.getPostId());
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
