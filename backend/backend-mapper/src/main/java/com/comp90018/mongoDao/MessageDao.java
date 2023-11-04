package com.comp90018.mongoDao;

import com.comp90018.dto.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageDao extends MongoRepository<Message, String> {
}
