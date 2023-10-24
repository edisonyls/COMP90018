package com.comp90018.enums;

public enum RedisEnum {
    REDIS_IP("redis_ip:"),
    REDIS_CODE("redis_code"),
    REDIS_TOKEN("redis_token"),
    REDIS_FOLLOW("redis_follow:"),
    REDIS_FAN("redis_fan:"),
    REDIS_VLOG_LIKES("redis_vlog_likes:"),
    REDIS_COMMENT_LIKES("redis_comment_likes:")
    ;

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
