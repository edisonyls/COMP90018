package com.comp90018.mapper;


import com.comp90018.my.mapper.MyMapper;
import com.comp90018.pojo.Followers;
import com.comp90018.vo.ListFollowerVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ListFollowerMapper extends MyMapper<Followers> {
    public List<ListFollowerVO> listFollower(@Param("paramMap") Map<String, Object> map);
}