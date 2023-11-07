package com.comp90018.service;
import com.comp90018.bo.UploadPostBO;
import com.comp90018.pojo.Post;

import java.util.List;

public interface PostService {

    Post createPost(UploadPostBO uploadPostBO);

    List<Post> getAllPost(String postType);
    List<Post> getAllPostPerUser(String userId);

    List<Post> getFilteredPost(String petCategory);

    boolean deletedPost(String postId);

    Post updatePost(UploadPostBO uploadPostBO);

}