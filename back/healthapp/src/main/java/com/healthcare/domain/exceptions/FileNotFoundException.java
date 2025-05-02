package com.healthcare.domain.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FileNotFoundException extends RuntimeException{
    private final String message;
}
