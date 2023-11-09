package com.comp90018.enums;

public enum ResponseStatusEnum {

    SUCCESS(true, "success!"),
    CODE_CANNOT_SEND(false,"The verification code can only be sent once within 30 seconds."),
    EMAIL_ALREADY_EXIST(false, "email already exist"),
    NICKNAME_ALREADY_EXIST(false, "nickname already exist"),
    ALREADY_FOLLOW(false, "already follow!"),
    HAS_NOT_FOLLOW(false, "has not follow!"),
    NO_FOLLOWERS(false, "no followers"),
    NO_FOLLOWINGS(false, "no followings"),
    FAILED(false, "failure!"),
    WRONG_CODE(false, "verify code is wrong or outdated"),
    USER_NOT_EXIST(false, "user does not exist!"),
    USER_ALREADY_LOGIN(false, "user already login"),
    EMAIL_AND_PASSWORD_WRONG(false, "email and password wrong"),
    USER_NOT_LOGIN(false, "user not logged in"),
    CHANGE_USER_INFO_FAIL(false, "change user info fail"),
    CAN_NOT_FOLLOW_SELF(false, "user can not follow itself"),
    MESSAGE_SEND_FAIL(false, "message send fail"),
    NO_MESSAGES(false, "no messages");

    private Boolean success;
    private String msg;

    ResponseStatusEnum(Boolean success, String msg) {
        this.success = success;
        this.msg = msg;
    }
    public Boolean success() {
        return success;
    }
    public String msg() {
        return msg;
    }
}
