package com.comp90018.bo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordBO {
    @NotBlank(message = "userId is null")
    private String userId;
    @NotBlank(message = "originalPassword is null")
    private String originalPassword;
    @NotBlank(message = "newPassword is null")
    private String newPassword;
}
