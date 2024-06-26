package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * redis key prefix enum
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum RedisEnum {
    REDIS_IP("redis_ip:"),
    REDIS_CODE("redis_code:"),
    REDIS_TOKEN("redis_token:"),
    REDIS_VLOG_LIKES("redis_vlog_likes:"),
    REDIS_COMMENT_LIKES("redis_comment_likes:"),
    REDIS_FOLLOWER_FOLLOWING_RELATION("redis_follower_following_relation:"),
    REDIS_FOLLOW_NUM("redis_follow_num:"),
    REDIS_FAN_NUM("redis_fan_num:"),
    REDIS_HASH("redis_hash:"),
    REDIS_POST_ID("redis_id");

    private String redisKey;

}
