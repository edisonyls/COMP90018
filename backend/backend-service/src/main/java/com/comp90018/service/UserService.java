package com.comp90018.service;

import com.comp90018.bo.ChangePasswordBO;
import com.comp90018.bo.ChangeUserImgBO;
import com.comp90018.bo.ChangeUserInfoBO;
import com.comp90018.pojo.Users;

public interface UserService {
    Users queryUsersIsExistByEmail(String email);
    Users queryUsersIsExistByNickname(String nickname);

    Users queryUserIsExistByEmailAndPassword(String email, String password);

    Users createUser(String email, String nickname, String password);

    Users queryUser(String userId);

    Users changeUserInfo(ChangeUserImgBO changeUserBO);
    Users changeUserInfo(ChangeUserInfoBO changeUserInfoBO);
    String changePassword(ChangePasswordBO changePasswordBO);
}
