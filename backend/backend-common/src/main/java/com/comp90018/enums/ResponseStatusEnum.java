package com.comp90018.enums;

public enum ResponseStatusEnum {

    SUCCESS(200, true, "success!"),
    FAILED(500, false, "failure!"),
    WRONG_CODE(501, false, "verify code is wrong or outdated"),
    USER_NOT_EXIST(502, false, "user does not exist!"),
    USER_NOT_LOGIN(503, false, "user not logged in");

    // 响应业务状态
    private Integer status;
    // 调用是否成功
    private Boolean success;
    // 响应消息，可以为成功或者失败的消息
    private String msg;

    ResponseStatusEnum(Integer status, Boolean success, String msg) {
        this.status = status;
        this.success = success;
        this.msg = msg;
    }

    public Integer status() {
        return status;
    }
    public Boolean success() {
        return success;
    }
    public String msg() {
        return msg;
    }
}