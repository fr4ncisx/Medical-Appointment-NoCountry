package com.healthcare.domain.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcare.domain.dto.response.CloudinaryResponse;
import com.healthcare.domain.exceptions.CloudinaryException;
import com.healthcare.domain.exceptions.IOFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    /**
     * Uploads every single file into Cloudinary returning the urls of the files
     *
     * @param file The file wanted to upload after validations
     * @return {@code CloudinaryResponse} with url/urls
     */
    public CloudinaryResponse uploadToCloudinary(File file) {
        try {
            var json = cloudinary.uploader()
                    .upload(file, ObjectUtils.asMap("public_id", "healthapp/" + file.getName()
                            .trim()
                            .replaceFirst("[.][^.]+$", "")));
            return serializeResponse(json);
        } catch (IOException e) {
            throw new IOFileException("Error uploading file: " + e.getMessage());
        } finally {
            try {
                Files.delete(file.toPath());
            } catch (IOException deleteEx) {
                log.warn("Could not delete file {}: {}", file.getAbsolutePath(), deleteEx.getMessage());
            }
        }
    }

    public CloudinaryResponse deleteFromCloudinary(String publicId) {
        try {
            var json = cloudinary.uploader()
                    .destroy(publicId, ObjectUtils.emptyMap());
            return serializeResponse(json);
        } catch (Exception e) {
            throw new CloudinaryException(e.getMessage());
        }
    }


    public String convertUrlToPublicId(String url) {
        if (url == null || url.isBlank())
            return "";
        String fixedUrl = url.replaceFirst(".*/upload/(v\\d+/)?", "");

        return fixedUrl.replaceFirst("\\.[^.]+$", "");
    }

    public CloudinaryResponse serializeResponse(Map<String, Object> json){
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(json,CloudinaryResponse.class );
    }
}
