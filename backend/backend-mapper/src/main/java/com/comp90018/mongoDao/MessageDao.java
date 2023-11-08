package com.comp90018.mongoDao;

import com.comp90018.dto.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageDao extends MongoRepository<Message, String> {
    List<Message> findAllBySenderIdOrReceiverIdOrderByTimeDesc(String senderId, String receiverId);

    List<Message> findAllBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimeAsc(String senderId1, String receiverId1, String senderId2, String receiverId2);
}
