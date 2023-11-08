package com.comp90018.enums;

public enum ResponseStatusEnum {

    SUCCESS(true, "success!"),
    ALREADY_FOLLOW(false, "already follow!"),
    HAS_NOT_FOLLOW(false, "has not follow!"),
    NO_FOLLOWERS(false, "no followers"),
    NO_FOLLOWINGS(false, "no followings"),
    FAILED(false, "failure!"),
    WRONG_CODE(false, "verify code is wrong or outdated"),
    USER_NOT_EXIST(false, "user does not exist!"),
    USER_NOT_LOGIN(false, "user not logged in"),
    CHANGE_USER_INFO_FAIL(false, "change user info fail"),
    CAN_NOT_FOLLOW_SELF(false, "user can not follow itself"),
    MESSAGE_SEND_FAIL(false, "message send fail"),
    NO_MESSAGES(false, "no messages");


    // 调用是否成功
    private Boolean success;
    // 响应消息，可以为成功或者失败的消息
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
