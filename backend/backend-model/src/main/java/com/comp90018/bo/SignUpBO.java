package com.comp90018.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SignUpBO {

    @NotBlank(message = "email is null")
    private String email;
    @NotBlank(message = "verify code is null")
    private String code;
    @NotBlank(message = "username is null")
    private String username;
    @NotBlank(message = "password is null")
    private String password;

}
