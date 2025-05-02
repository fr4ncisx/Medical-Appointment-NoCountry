package com.healthcare.domain.controller;

import com.healthcare.domain.dto.response.CloudinaryResponse;
import com.healthcare.domain.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cloudinary")
@RequiredArgsConstructor
public class CloudinaryController {
    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<List<CloudinaryResponse>> uploadImage(@RequestPart MultipartFile... file) {
        return imageService.upload(file);
    }

    @PostMapping("/delete")
    public void deleteImage(String publicId) {
        imageService.delete(publicId);
    }

    @PostMapping("/edit")
    public void replaceImage(@RequestPart MultipartFile file, String publicId) {
        imageService.edit(file, publicId);
    }

}
