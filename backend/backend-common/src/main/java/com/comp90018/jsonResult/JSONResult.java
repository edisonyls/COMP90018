package com.comp90018.jsonResult;

import com.comp90018.enums.ResponseStatusEnum;

import java.util.Map;

public class JSONResult {

    private Integer status;

    private String msg;

    private Boolean success;

    private Object data;

    public static JSONResult ok(Object data) {
        return new JSONResult(data);
    }
    public static JSONResult ok() {
        return new JSONResult(ResponseStatusEnum.SUCCESS);
    }
    public JSONResult(Object data) {
        this.msg = ResponseStatusEnum.SUCCESS.msg();
        this.success = ResponseStatusEnum.SUCCESS.success();
        this.data = data;
    }

    public static JSONResult error() {
        return new JSONResult(ResponseStatusEnum.FAILED);
    }

    public static JSONResult errorMap(Map map) {
        return new JSONResult(ResponseStatusEnum.FAILED, map);
    }

    public static JSONResult errorMsg(String msg) {
        return new JSONResult(ResponseStatusEnum.FAILED, msg);
    }

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
