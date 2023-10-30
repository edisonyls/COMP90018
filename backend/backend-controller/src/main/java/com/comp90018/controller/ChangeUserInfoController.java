package com.comp90018.controller;

import com.comp90018.bo.ChangeUserBO;
import com.comp90018.enums.ResponseStatusEnum;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.pojo.Users;
import com.comp90018.utils.MinIOUtils;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@Api(tags = "change user information controller")
@RequestMapping("settings")
public class ChangeUserInfoController extends BaseController{

    @PostMapping("/changeInfo")
    public JSONResult changeinfo(@RequestBody ChangeUserBO changeUserBO) {
        Users newUser = userService.changeUserInfo(changeUserBO);

        if(newUser == null) {
            return JSONResult.errorCustom(ResponseStatusEnum.CHANGE_USER_INFO_FAIL);
        }
        return JSONResult.ok(newUser);
    }

    @PostMapping("uploadProfile")
    public JSONResult uploadProfile(@RequestParam String usrId, MultipartFile file) throws Exception {
        ChangeUserBO changeUserBO = new ChangeUserBO();

        String fileName = file.getOriginalFilename();

        MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, file.getInputStream());

        String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;

        changeUserBO.setId(usrId);
        changeUserBO.setProfile(imgUrl);

        Users newUser = userService.changeUserInfo(changeUserBO);
        return JSONResult.ok(newUser);
    }

    @PostMapping("uploadBgImg")
    public JSONResult uploadBgImg(@RequestParam String usrId, MultipartFile file) throws Exception {
        ChangeUserBO changeUserBO = new ChangeUserBO();

        String fileName = file.getOriginalFilename();

        MinIOUtils.uploadFile(minIOConfig.getBucketName(), fileName, file.getInputStream());

        String imgUrl = minIOConfig.getFileHost() + "/" + minIOConfig.getBucketName() + "/" + fileName;

        changeUserBO.setId(usrId);
        changeUserBO.setBgImg(imgUrl);

        Users newUser = userService.changeUserInfo(changeUserBO);
        return JSONResult.ok(newUser);
    }

}
