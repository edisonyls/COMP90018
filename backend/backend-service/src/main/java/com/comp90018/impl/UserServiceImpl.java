package com.comp90018.impl;

import com.comp90018.bo.ChangePasswordBO;
import com.comp90018.bo.ChangeUserImgBO;
import com.comp90018.bo.ChangeUserInfoBO;
import com.comp90018.enums.ChangeResEnum;
import com.comp90018.enums.SexEnum;
import com.comp90018.mapper.UsersMapper;
import com.comp90018.pojo.Users;
import com.comp90018.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import java.util.Date;


@Service
@Slf4j
public class UserServiceImpl extends BaseImpl implements UserService {

    @Autowired
    private UsersMapper usersMapper;


    /**
     * query by email
     * @param email
     * @return
     */
    @Override
    public Users queryUsersIsExistByEmail(String email) {
        Example example = new Example(Users.class);
        example.createCriteria().andEqualTo("email1", email);
        Users user = usersMapper.selectOneByExample(example);
        return user;
    }

    /**
     * query by nickname
     * @param nickname
     * @return
     */
    @Override
    public Users queryUsersIsExistByNickname(String nickname) {
        Example example = new Example(Users.class);
        example.createCriteria().andEqualTo("nickname", nickname);
        Users user = usersMapper.selectOneByExample(example);
        return user;
    }

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

        //encrypt password
        String hashPw = BCrypt.hashpw(password, BCrypt.gensalt(12));
        user.setPassword(hashPw);

        user.setId(userId);

        //set default profile and background
        user.setProfile("http://47.74.87.207:9000/comp90018/profile.jpg");
        user.setBgImg("http://47.74.87.207:9000/comp90018/bg.jpg");
        user.setSex(SexEnum.OTHER.getSex());
        user.setDescription("default");
        user.setBirthday(new Date());
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
     * @param changeUserInfoBO
     * @return
     */
    @Override
    @Transactional
    public Users changeUserInfo(ChangeUserInfoBO changeUserInfoBO) {
        //overwrite ChangeUserInfoBO
        Users newUser = new Users();
        BeanUtils.copyProperties(changeUserInfoBO, newUser);
        String id = changeUserInfoBO.getId();

        Example example = new Example(Users.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("id", id);
        Users users = usersMapper.selectOneByExample(example);

        if(users == null) {
            return null;
        }

        int updateByPrimaryKeySelective = usersMapper.updateByPrimaryKeySelective(newUser);
        if(updateByPrimaryKeySelective == 1) {
            return queryUser(id);
        }else {
            return null;
        }
    }

    /**
     * change password
     * @param changePasswordBO
     * @return
     */
    @Override
    public String changePassword(ChangePasswordBO changePasswordBO) {
        String newPassword = changePasswordBO.getNewPassword();
        String originalPassword = changePasswordBO.getOriginalPassword();
        String id = changePasswordBO.getUserId();

        Example example = new Example(Users.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("id", id);
        Users users = usersMapper.selectOneByExample(example);

        if(users == null) {
            log.info(ChangeResEnum.USERID_IS_WRONG.getChangeRes());
            return ChangeResEnum.USERID_IS_WRONG.getChangeRes();
        }

        String savePassword = users.getPassword();
        if(!BCrypt.checkpw(originalPassword, savePassword)) {
            log.info(ChangeResEnum.ORIGINAL_PASSWORD_IS_WRONG.getChangeRes());
            return ChangeResEnum.ORIGINAL_PASSWORD_IS_WRONG.getChangeRes();
        }

        if(originalPassword.equals(newPassword)) {
            log.info(ChangeResEnum.NEW_PASSWORD_IS_SAME_WITH_ORIGINAL_PASSWORD.getChangeRes());
            return ChangeResEnum.NEW_PASSWORD_IS_SAME_WITH_ORIGINAL_PASSWORD.getChangeRes();
        }

        Users newUser = new Users();
        newUser.setId(id);
        newUser.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt(12)));

        int updateByPrimaryKeySelective = usersMapper.updateByPrimaryKeySelective(newUser);
        if(updateByPrimaryKeySelective == 1) {
            log.info(ChangeResEnum.CHANGE_SUCCESS.getChangeRes());
            return ChangeResEnum.CHANGE_SUCCESS.getChangeRes();
        }else {
            log.info(ChangeResEnum.CHANGE_FAIL.getChangeRes());
            return ChangeResEnum.CHANGE_FAIL.getChangeRes();
        }

    }

    /**
     * change user profile or bgImg
     * @param changeUserImgBO
     * @return
     */
    @Override
    @Transactional
    public Users changeUserInfo(ChangeUserImgBO changeUserImgBO) {
        //overwrite ChangeUserImgBO
        Users newUser = new Users();
        BeanUtils.copyProperties(changeUserImgBO, newUser);
        String id = changeUserImgBO.getId();

        Example example = new Example(Users.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("id", id);
        Users users = usersMapper.selectOneByExample(example);

        if(users == null) {
            log.info("no user");
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
