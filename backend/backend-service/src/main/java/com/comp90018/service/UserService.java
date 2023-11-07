package com.comp90018.service;

import com.comp90018.bo.ChangeUserImgBO;
import com.comp90018.bo.ChangeUserInfoBO;
import com.comp90018.pojo.Users;

public interface UserService {

    public Users queryUserIsExistByEmailAndPassword(String email, String password);

    public Users createUser(String email, String nickname, String password);

    public Users queryUser(String userId);

    public Users changeUserInfo(ChangeUserImgBO changeUserBO);
    public Users changeUserInfo(ChangeUserInfoBO changeUserInfoBO);
}
