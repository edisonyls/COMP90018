package com.comp90018.enums;

public enum RedisEnum {
    REDIS_IP("redis_ip:"),
    REDIS_CODE("redis_code:"),
    REDIS_TOKEN("redis_token:"),
    REDIS_VLOG_LIKES("redis_vlog_likes:"),
    REDIS_COMMENT_LIKES("redis_comment_likes:"),
    REDIS_FOLLOWER_FOLLOWING_RELATION("redis_follower_following_relation:"),
    REDIS_FOLLOW_NUM("redis_follow_num:"),
    REDIS_FAN_NUM("redis_fan_num:"),
<<<<<<< HEAD
    REDIS_HASH("redis_hash:"),
    REDIS_POST_ID("redis_id");
=======
    REDIS_ID_NUM("redis_id");

>>>>>>> FoundPet


    private String redisKey;

    RedisEnum(String redisKey) {
        this.redisKey = redisKey;
    }

    RedisEnum() {
    }

    public String getRedisKey() {
        return redisKey;
    }
}
