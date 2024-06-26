package com.comp90018;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * mail object
 */
@Data
@AllArgsConstructor
public class Mail {
    private String sender;
    private String code;
    private String receiver;
    private String title;
}
