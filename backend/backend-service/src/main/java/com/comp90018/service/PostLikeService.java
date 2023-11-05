package com.comp90018.service;

import com.comp90018.bo.LikedPostBO;
import com.comp90018.pojo.MyLikedPost;
import com.comp90018.pojo.Post;

public interface PostLikeService {

    boolean likeAPost(LikedPostBO likedPostBO);

}
