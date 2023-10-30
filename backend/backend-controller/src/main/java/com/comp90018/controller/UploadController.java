package com.comp90018.controller;

import com.comp90018.config.MinIOConfig;
import com.comp90018.jsonResult.JSONResult;
import com.comp90018.utils.MinIOUtils;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Api(tags = "upload controller")
@RestController
@RequestMapping("upload")
public class UploadController {

    @Autowired
    private MinIOConfig minIOConfig;

    @PostMapping("upload")
    public JSONResult upload(MultipartFile file) throws Exception {

        String fileName = file.getOriginalFilename();

        MinIOUtils.uploadFile(minIOConfig.getBucketName(),
                fileName,
                file.getInputStream());

        String imgUrl = minIOConfig.getFileHost()
                + "/"
                + minIOConfig.getBucketName()
                + "/"
                + fileName;
        return JSONResult.ok();
    }
}
