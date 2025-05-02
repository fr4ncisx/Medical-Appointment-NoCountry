package com.healthcare.domain.exceptions;

import com.healthcare.domain.dto.response.InvalidFilesResponse;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class FileUnableToUploadException extends RuntimeException{
    private Map<String, List<InvalidFilesResponse>> files;
    private String message;

    public FileUnableToUploadException(Map<String, List<InvalidFilesResponse>> files) {
        super("Archivos inválidos");
        this.files = files;
    }

    public FileUnableToUploadException(String message) {
        super(message);
    }
}
