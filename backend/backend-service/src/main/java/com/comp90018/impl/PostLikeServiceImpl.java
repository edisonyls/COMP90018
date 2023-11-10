package com.comp90018.impl;

import com.comp90018.bo.LikedPostBO;
import com.comp90018.bo.MessageConvertBO;
import com.comp90018.enums.MessageContentEnum;
import com.comp90018.enums.MessageTypeEnum;
import com.comp90018.idworker.Sid;
import com.comp90018.mapper.MyLikedPostMapper;
import com.comp90018.mapper.PostMapper;
import com.comp90018.pojo.MyLikedPost;
import com.comp90018.pojo.Post;
import com.comp90018.service.MessageService;
import com.comp90018.service.PostLikeService;
import com.comp90018.utils.JsonUtils;
import com.comp90018.utils.RabbitMQUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.util.HashMap;
import java.util.List;


@Slf4j
@Service
public class PostLikeServiceImpl implements PostLikeService {

    @Autowired
    private Sid sid;
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private MessageService messageService;
    @Autowired
    private PostMapper postMapper;

    @Autowired
    private MyLikedPostMapper myLikedPostMapper;

    @Override
    @Transactional
    public boolean likeAPost(LikedPostBO likedPostBO) {

        // Check if this user already liked this post before
        String postId = likedPostBO.getPostId();
        String userId = likedPostBO.getUserId();

        Example example1 = new Example(MyLikedPost.class);
        example1.createCriteria().andEqualTo("userId", userId).andEqualTo("postId", postId);
        List<MyLikedPost> myLikedPostList = myLikedPostMapper.selectByExample(example1);
        if (!myLikedPostList.isEmpty()) {
            // if so, then cancel the like
            MyLikedPost myLikedPost = myLikedPostList.get(0);
            Example example = new Example(Post.class);
            example.createCriteria().andEqualTo("id", postId);
            Post post = postMapper.selectByExample(example).get(0);
            if (post == null) {
                return false;
            } else {
                int likeCount = post.getLikesCounts() - 1;
                post.setLikesCounts(likeCount);
                postMapper.updateByPrimaryKeySelective(post);
                myLikedPostMapper.delete(myLikedPost);
                HashMap<String, Object> map = new HashMap<>();
                map.put(MessageContentEnum.BEHAVIOR.getSystemMessage(), MessageContentEnum.POST_UNLIKE_NOTIFY.getSystemMessage()); // (behavior, like)

//                messageService.createMessage(userId, post.getPosterId(), MessageTypeEnum.SYSTEM_MESSAGE.getType(), map);

                MessageConvertBO messageConvertBO = new MessageConvertBO();
                messageConvertBO.setSenderId(userId);
                messageConvertBO.setReceiverId(post.getPosterId());
                messageConvertBO.setType(MessageTypeEnum.SYSTEM_MESSAGE.getType());
                messageConvertBO.setContent(map);

                rabbitTemplate.convertAndSend(RabbitMQUtils.EXCHANGE_MSG,
                        "sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.POST_UNLIKE_NOTIFY.getSystemMessage(),
                        JsonUtils.objectToJson(messageConvertBO));

                return true;
            }
        } else {
            MyLikedPost myLikedPost = new MyLikedPost();
            String id = sid.nextShort();
            myLikedPost.setId(id);
            myLikedPost.setPostId(postId);
            myLikedPost.setUserId(userId);
            Example example = new Example(Post.class);
            example.createCriteria().andEqualTo("id", postId);
            Post post = postMapper.selectByExample(example).get(0);
            if (post == null) {
                return false;
            } else {
                int likeCount = post.getLikesCounts() + 1;
                post.setLikesCounts(likeCount);
                postMapper.updateByPrimaryKeySelective(post);
                myLikedPostMapper.insert(myLikedPost);

                HashMap<String, Object> map = new HashMap<>();
                map.put(MessageContentEnum.BEHAVIOR.getSystemMessage(), MessageContentEnum.POST_LIKE_NOTIFY.getSystemMessage()); // (behavior, like)

                MessageConvertBO messageConvertBO = new MessageConvertBO();
                messageConvertBO.setSenderId(userId);
                messageConvertBO.setReceiverId(post.getPosterId());
                messageConvertBO.setType(MessageTypeEnum.SYSTEM_MESSAGE.getType());
                messageConvertBO.setContent(map);

                rabbitTemplate.convertAndSend(RabbitMQUtils.EXCHANGE_MSG,
                        "sys.msg." + MessageTypeEnum.SYSTEM_MESSAGE.getType() + "." + MessageContentEnum.POST_LIKE_NOTIFY.getSystemMessage(),
                        JsonUtils.objectToJson(messageConvertBO));

//                messageService.createMessage(userId, post.getPosterId(), MessageTypeEnum.SYSTEM_MESSAGE.getType(), map);

                return true;
            }
        }

    }

}
