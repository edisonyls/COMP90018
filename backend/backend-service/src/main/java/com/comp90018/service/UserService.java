package com.comp90018.service;

import com.comp90018.pojo.Users;

public interface UserService {

    public Users queryUserIsExistByEmail(String email);

    public Users createUser(String email, String nickname, String password);
}
