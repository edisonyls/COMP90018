package com.comp90018.impl;

import com.comp90018.bo.ChangeUserBO;
import com.comp90018.enums.SexEnum;
import com.comp90018.idworker.Sid;
import com.comp90018.mapper.UsersMapper;
import com.comp90018.pojo.Users;
import com.comp90018.service.UserService;
import com.comp90018.utils.DateUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.util.Date;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersMapper usersMapper;

    @Autowired
    private Sid sid;

    /**
     * Verify the account through email and password.
     * @param email
     * @param password
     * @return
     */
    @Override
    public Users queryUserIsExistByEmailAndPassword(String email, String password) {
        Example example = new Example(Users.class);
        example.createCriteria().andEqualTo("email1", email).andEqualTo("password", password);
        Users user = usersMapper.selectOneByExample(example);
        return user;
    }

    /**
     * Create user
     * @param email
     * @param nickname
     * @param password
     * @return
     */
    @Override
    public Users createUser(String email, String nickname, String password) {
        String userId = sid.nextShort();
        Users user = new Users();
        user.setEmail1(email);
        user.setNickname(nickname);
        user.setPassword(password);
        user.setId(userId);

        user.setProfile("default");
        user.setSex(SexEnum.OTHER.getSex());
        user.setBirthday(DateUtil.stringToDate("1800-11-11"));
        user.setDescription("default");

        user.setCreatedTime(new Date());
        user.setUpdatedTime(new Date());

        usersMapper.insert(user);
        return user;
    }

    /**
     * query user information
     * @param userId
     * @return
     */
    @Override
    public Users queryUser(String userId) {
        Users user = usersMapper.selectByPrimaryKey(userId);
        return user;
    }

    /**
     * change user information
     * @param changeUserBO
     * @return
     */
    @Override
    @Transactional
    public Users changeUserInfo(ChangeUserBO changeUserBO) {
        Users newUser = new Users();
        BeanUtils.copyProperties(changeUserBO, newUser);
        String id = changeUserBO.getId();

        //mobile can not be the same
        Example example = new Example(Users.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("mobile", changeUserBO.getMobile()).andNotEqualTo("id", id);
        Users users = usersMapper.selectOneByExample(example);

        if(users != null) {
            return null;
        }

        int updateByPrimaryKeySelective = usersMapper.updateByPrimaryKeySelective(newUser);
        if(updateByPrimaryKeySelective == 1) {
            return queryUser(id);
        }else {
            return null;
        }
    }


}
