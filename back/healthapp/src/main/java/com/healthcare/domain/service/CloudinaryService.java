package com.healthcare.domain.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.healthcare.domain.dto.response.CloudinaryResponse;
import com.healthcare.domain.exceptions.CloudinaryException;
import com.healthcare.domain.exceptions.IOFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Slf4j
@Service
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
                    .upload(file, ObjectUtils.asMap("public_id", "healthapp/" + file.getName().trim().replaceFirst("[.][^.]+$", "")))
                    .get("secure_url")
                    .toString();
            return new CloudinaryResponse(json, null);
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
                    .destroy(publicId, ObjectUtils.emptyMap())
                    .get("result")
                    .toString();
            return new CloudinaryResponse(null, json);
        } catch (Exception e) {
            throw new CloudinaryException(e.getMessage());
        }
    }
}
