package com.comp90018.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * pet category enum
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum PetCategoryEnum {
    DOG(0),
    CAT(1);
    private Integer type;
}