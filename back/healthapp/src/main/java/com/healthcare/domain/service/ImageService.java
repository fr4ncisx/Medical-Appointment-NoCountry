package com.healthcare.domain.service;

import com.healthcare.domain.dto.response.CloudinaryResponse;
import com.healthcare.domain.dto.response.FilesResponse;
import com.healthcare.domain.exceptions.CloudinaryException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {
    private final CloudinaryService cloudinaryService;
    private final FileService fileService;

    /**
     * function to upload the image to Cloudinary
     * first call this method and then call the other method to save in db
     *
     * @param file MultipartFile from Controller
     * @return ResponseEntity with list of urls
     */
    public ResponseEntity<List<CloudinaryResponse>> upload(MultipartFile... file) {
        var fileList = fileService.verifyFile(file);
        return ResponseEntity.ok(fileList.stream()
                .map(FilesResponse::getValidFile)
                .filter(Objects::nonNull)
                .map(cloudinaryService::uploadToCloudinary)
                .toList());
    }

    public ResponseEntity<CloudinaryResponse> edit(MultipartFile image, String publicId) {
        var file = fileService.verifyOneFile(image);
        var cloudinaryResponse = cloudinaryService.deleteFromCloudinary(publicId);
        log.warn("File with public_id: {} , was {} ", publicId, cloudinaryResponse.getResult());
        return ResponseEntity.ok(cloudinaryService.uploadToCloudinary(file));
    }

    public ResponseEntity<CloudinaryResponse> delete(String publicId) {
        var cloudinaryResponse = cloudinaryService.deleteFromCloudinary(publicId);
        if(cloudinaryResponse.getResult().equals("not found")){
            throw new CloudinaryException("public_id: " + publicId + " was not found in Cloudinary");
        }
        return ResponseEntity.ok(cloudinaryResponse);
    }
}
