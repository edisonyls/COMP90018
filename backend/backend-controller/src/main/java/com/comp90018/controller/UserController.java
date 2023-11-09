package com.comp90018.controller;


import com.comp90018.bo.ChangePasswordBO;
import com.comp90018.bo.ChangeUserImgBO;
import com.comp90018.bo.ChangeUserInfoBO;
import com.comp90018.enums.ChangeResEnum;
import com.comp90018.enums.RedisEnum;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import com.comp90018.utils.MinIOUtils;
import com.comp90018.vo.UserVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@Api(tags = "user information controller")
@RequestMapping("user")
public class UserController extends BaseController{

    @ApiOperation("change user information except profile and bgImg")
    @PostMapping("/changeUserInfo")
    public JSONResult changeinfo(@RequestBody ChangeUserInfoBO changeUserInfoBO) {
        Users newUser = userService.changeUserInfo(changeUserInfoBO);

        if(newUser == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.CHANGE_USER_INFO_FAIL);
        }
        return JSONResult.ok(newUser);
    }

    @ApiOperation("change user password")
    @PostMapping("/changePassword")
    public JSONResult changePassword(@RequestBody ChangePasswordBO changePasswordBO) {
        String s = userService.changePassword(changePasswordBO);
        if (ChangeResEnum.CHANGE_SUCCESS.getChangeRes().equals(s)) {
            return JSONResult.ok(s);
        }
        return JSONResult.errorMsg(s);
    }

    @PostMapping("uploadProfile")
    @ApiOperation("upload profile picture")
    public JSONResult uploadProfile(@RequestParam String usrId, MultipartFile file) throws Exception {
        ChangeUserImgBO changeUserImgBO = new ChangeUserImgBO();

        String fileName = file.getOriginalFilename();

        MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, file.getInputStream());

        String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;

        changeUserImgBO.setId(usrId);
        changeUserImgBO.setProfile(imgUrl);

        Users newUser = userService.changeUserInfo(changeUserImgBO);
        return JSONResult.ok(newUser);
    }

    @PostMapping("uploadBgImg")
    @ApiOperation("upload bgImg")
    public JSONResult uploadBgImg(@RequestParam String usrId, MultipartFile file) throws Exception {
        ChangeUserImgBO changeUserImgBO = new ChangeUserImgBO();

        String fileName = file.getOriginalFilename();

        MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, file.getInputStream());

        String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;

        changeUserImgBO.setId(usrId);
        changeUserImgBO.setBgImg(imgUrl);

        Users newUser = userService.changeUserInfo(changeUserImgBO);
        return JSONResult.ok(newUser);
    }

    @GetMapping("queryUserInfo")
    @ApiOperation("query user info by userId")
    public JSONResult queryUserInfo(@RequestParam String userId) {
        Users user = userService.queryUser(userId);
        UserVO usersVO = new UserVO();
        BeanUtils.copyProperties(user, usersVO);

        int myFollows = StringUtils.isBlank(redis.get(RedisEnum.REDIS_FOLLOW_NUM + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_FOLLOW_NUM + userId));
        int myFans = StringUtils.isBlank(redis.get(RedisEnum.REDIS_FAN_NUM + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_FAN_NUM + userId));
        int myVlogLikes = StringUtils.isBlank(redis.get(RedisEnum.REDIS_VLOG_LIKES + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_VLOG_LIKES + userId));
        int myCommentLikes = StringUtils.isBlank(redis.get(RedisEnum.REDIS_COMMENT_LIKES + userId))? 0: Integer.parseInt(redis.get(RedisEnum.REDIS_COMMENT_LIKES + userId));

        usersVO.setMyFollows(myFollows);
        usersVO.setMyFans(myFans);
        usersVO.setMyVlogLikes(myVlogLikes);
        usersVO.setMyCommentLikes(myCommentLikes);

        return JSONResult.ok(usersVO);
    }

    @PostMapping("queryUserStatus")
    @ApiOperation("query user status")
    public JSONResult queryUserStatus(@RequestParam String usrId) {
        if(redis.keyIsExist(RedisEnum.REDIS_TOKEN + usrId)) {
            return JSONResult.ok(ResponseStatusEnum.USER_ALREADY_LOGIN);
        }
        return JSONResult.errorCustom(ResponseStatusEnum.USER_NOT_LOGIN);

    }
}
