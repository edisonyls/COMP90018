package com.comp90018.mongoDao;

import com.comp90018.dto.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageDao extends MongoRepository<Message, String> {

    /**
     * search by receiverId
     * @param receiverId
     * @return
     */
    List<Message> findAllByReceiverIdOrderByTimeDesc(String receiverId);

    //List<Message> findAllBySenderIdOrReceiverIdOrderByTimeDesc(String senderId, String receiverId);

    /**
     * search by (s1 and r1) or by (s2 and r2)
     * @param senderId1
     * @param receiverId1
     * @param senderId2
     * @param receiverId2
     * @return
     */
    List<Message> findAllBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimeAsc(String senderId1, String receiverId1, String senderId2, String receiverId2);
}
