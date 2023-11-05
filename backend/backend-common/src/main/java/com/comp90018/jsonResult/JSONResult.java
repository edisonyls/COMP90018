package com.comp90018.jsonResult;

import com.comp90018.enums.ResponseStatusEnum;

import java.util.Map;

public class JSONResult {

    // 响应业务状态码
    private Integer status;

    // 响应消息
    private String msg;

    // 是否成功
    private Boolean success;

    // 响应数据，可以是Object，也可以是List或Map等
    private Object data;

    /**
     * 成功返回，带有数据的，直接往OK方法丢data数据即可
     * @param data
     * @return
     */
    public static JSONResult ok(Object data) {
        return new JSONResult(data);
    }
    /**
     * 成功返回，不带有数据的，直接调用ok方法，data无须传入（其实就是null）
     * @return
     */
    public static JSONResult ok() {
        return new JSONResult(ResponseStatusEnum.SUCCESS);
    }
    public JSONResult(Object data) {
        this.msg = ResponseStatusEnum.SUCCESS.msg();
        this.success = ResponseStatusEnum.SUCCESS.success();
        this.data = data;
    }


    /**
     * 错误返回，直接调用error方法即可，当然也可以在ResponseStatusEnum中自定义错误后再返回也都可以
     * @return
     */
    public static JSONResult error() {
        return new JSONResult(ResponseStatusEnum.FAILED);
    }

    /**
     * 错误返回，map中包含了多条错误信息，可以用于表单验证，把错误统一的全部返回出去
     * @param map
     * @return
     */
    public static JSONResult errorMap(Map map) {
        return new JSONResult(ResponseStatusEnum.FAILED, map);
    }

    /**
     * 错误返回，直接返回错误的消息
     * @param msg
     * @return
     */
    public static JSONResult errorMsg(String msg) {
        return new JSONResult(ResponseStatusEnum.FAILED, msg);
    }


    /**
     * 自定义错误范围，需要传入一个自定义的枚举，可以到[ResponseStatusEnum.java[中自定义后再传入
     * @param responseStatus
     * @return
     */
    public static JSONResult errorCustom(ResponseStatusEnum responseStatus) {
        return new JSONResult(responseStatus);
    }
    public static JSONResult exception(ResponseStatusEnum responseStatus) {
        return new JSONResult(responseStatus);
    }

    public JSONResult(ResponseStatusEnum responseStatus) {
        this.msg = responseStatus.msg();
        this.success = responseStatus.success();
    }
    public JSONResult(ResponseStatusEnum responseStatus, Object data) {
        this.msg = responseStatus.msg();
        this.success = responseStatus.success();
        this.data = data;
    }
    public JSONResult(ResponseStatusEnum responseStatus, String msg) {
        this.msg = msg;
        this.success = responseStatus.success();
    }

    public JSONResult() {
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }
}
