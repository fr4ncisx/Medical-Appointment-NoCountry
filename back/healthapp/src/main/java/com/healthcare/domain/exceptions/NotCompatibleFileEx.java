package com.healthcare.domain.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotCompatibleFileEx extends RuntimeException{
    private final String message;
}
