package com.comp90018.mongoDao;

import com.comp90018.dto.MessageDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageDao extends MongoRepository<MessageDTO, String> {

    /**
     * search by receiverId
     * @param receiverId
     * @return
     */
    List<MessageDTO> findAllByReceiverIdOrderByTimeDesc(String receiverId);

    //List<MessageDTO> findAllBySenderIdOrReceiverIdOrderByTimeDesc(String senderId, String receiverId);

    /**
     * search by (s1 and r1) or by (s2 and r2)
     * @param senderId1
     * @param receiverId1
     * @param senderId2
     * @param receiverId2
     * @return
     */
    List<MessageDTO> findAllBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderByTimeAsc(String senderId1, String receiverId1, String senderId2, String receiverId2);
}
