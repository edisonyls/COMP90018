package com.comp90018.service;

import com.comp90018.bo.ChangePasswordBO;
import com.comp90018.bo.ChangeUserImgBO;
import com.comp90018.bo.ChangeUserInfoBO;
import com.comp90018.pojo.Users;

public interface UserService {
    //query email
    Users queryUsersIsExistByEmail(String email);

    //query nickname
    Users queryUsersIsExistByNickname(String nickname);

    //query email and password
    Users queryUserIsExistByEmailAndPassword(String email, String password);

    //create user
    Users createUser(String email, String nickname, String password);

    //query userId
    Users queryUser(String userId);

    //change image
    Users changeUserInfo(ChangeUserImgBO changeUserBO);

    //change information
    Users changeUserInfo(ChangeUserInfoBO changeUserInfoBO);

    //change password
    String changePassword(ChangePasswordBO changePasswordBO);
}
