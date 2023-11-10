package com.comp90018.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.StringRedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Redis utils class
 */
@Component
public class RedisOperator {
	
	@Autowired
	private StringRedisTemplate redisTemplate;
	public boolean keyIsExist(String key) {
		return redisTemplate.hasKey(key);
	}

	public long increment(String key, long delta) {
		return redisTemplate.opsForValue().increment(key, delta);
	}

	public long decrement(String key, long delta) {
		return redisTemplate.opsForValue().decrement(key, delta);
	}

	public void del(String key) {
		redisTemplate.delete(key);
	}

	public void set(String key, String value) {
		redisTemplate.opsForValue().set(key, value);
	}

	public void set(String key, String value, long timeout) {
		redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
	}


	public String get(String key) {
		return (String)redisTemplate.opsForValue().get(key);
	}


	public List<Object> batchGet(List<String> keys) {
		List<Object> result = redisTemplate.executePipelined(new RedisCallback<String>() {
			@Override
			public String doInRedis(RedisConnection connection) throws DataAccessException {
				StringRedisConnection src = (StringRedisConnection)connection;

				for (String k : keys) {
					src.get(k);
				}
				return null;
			}
		});

		return result;
	}

}