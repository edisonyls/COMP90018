package com.comp90018.mapper;


import com.comp90018.my.mapper.MyMapper;
import com.comp90018.pojo.Followers;
import com.comp90018.vo.ListFollowerVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * list all followings
 */
@Repository
public interface ListFollowingMapper extends MyMapper<Followers> {
    public List<ListFollowerVO> listFollowing(@Param("paramMap") Map<String, Object> map);
}