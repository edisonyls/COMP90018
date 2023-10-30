package com.comp90018.service;
import com.comp90018.pojo.Post;

public interface PostService {

    public Post createPetMissingPost(String userId, int postType, String petCategory, String petBread, String petName, Double latitude, Double longitude);

    public Post createFoundAPetPost(String userId, int postType, String petCategory, String petBread, String petName, String contactNumber, String title, String description, Double latitude, Double longitude);

    public Post createGeneralPost(String userId, String title, String description, Double latitude, Double longitude);
}