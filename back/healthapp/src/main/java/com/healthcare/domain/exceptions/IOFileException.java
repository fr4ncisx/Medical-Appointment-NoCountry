package com.healthcare.domain.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class IOFileException extends RuntimeException{
    private final String message;
}
