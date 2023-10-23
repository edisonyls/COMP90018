package com.comp90018.impl;

import com.comp90018.idworker.Sid;
import com.comp90018.mapper.UsersMapper;
import com.comp90018.pojo.Users;
import com.comp90018.service.UserService;
import com.comp90018.utils.DateUtil;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.Date;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private Sid sid;
    @Override
    public Users queryUserIsExistByEmail(String email) {
        Example example = new Example(Users.class);
        example.createCriteria().andEqualTo("email", email);
        Users user = usersMapper.selectOneByExample(example);
        return user;
    }

    @Override
    public Users createUser(String email, String nickname, String password) {
        String userId = sid.nextShort();
        Users user = new Users();
        user.setEmail1(email);
        user.setNickname(nickname);
        user.setPassword(password);

        //TODO 引入枚举类重写初始化
        user.setAppId("default");
        user.setProfile("default");
        user.setSex(2);
        user.setBirthday(DateUtil.stringToDate("1900-01-01"));
        user.setDescription("default");
        user.setCanAppIdBeUpdated(0);

        user.setCreatedTime(new Date());
        user.setUpdatedTime(new Date());

        usersMapper.insert(user);
        return user;
    }


}
