package com.comp90018.service;
import com.comp90018.pojo.Post;

import java.util.ArrayList;
import java.util.List;

public interface PostService {

    Post createPetMissingPost(String userId, String postImg, int postType, String petCategory, String petBread, String petName, String contactNumber, String title, String description, Double latitude, Double longitude, String rewards);

    Post createFoundAPetPost(String userId, String postImg, int postType, String petCategory, String petBread, String petName, String contactNumber, String title, String description, Double latitude, Double longitude);

    Post createGeneralPost(String userId, String postImg, int postType, String title, String description, Double latitude, Double longitude, String tag);

    List<Post> getAllPost();
    List<Post> getAllPostPerUser(String userId);
}