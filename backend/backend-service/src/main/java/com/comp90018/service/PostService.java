package com.comp90018.service;
import com.comp90018.pojo.Post;

public interface PostService {

    Post createPetMissingPost(String userId, String postImg, int postType, String petCategory, String petBread, String petName, Double latitude, Double longitude);

    Post createFoundAPetPost(String userId, String postImg, int postType, String petCategory, String petBread, String petName, String contactNumber, String title, String description, Double latitude, Double longitude);

    Post createGeneralPost(String userId, String postImg, int postType, String title, String description, Double latitude, Double longitude);
}