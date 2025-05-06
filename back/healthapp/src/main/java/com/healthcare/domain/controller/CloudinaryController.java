package com.healthcare.domain.controller;

import com.healthcare.domain.dto.response.CloudinaryResponse;
import com.healthcare.domain.service.ImageService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cloudinary")
@RequiredArgsConstructor
public class CloudinaryController {
    private final ImageService imageService;

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PostMapping("/upload")
    public ResponseEntity<List<CloudinaryResponse>> uploadImage(@RequestPart MultipartFile... file) {
        return imageService.upload(file);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación exitosa", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"result\":\"ok\"}"))),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"ERROR\":\"public_id: XXXXXXXXXX was not found in Cloudinary\"}")))
    })
    @PostMapping("/delete")
    public ResponseEntity<CloudinaryResponse> deleteImage(@RequestParam String publicId) {
        return imageService.delete(publicId);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operación exitosa", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = """
                    {
                    \t"url": "https://res.cloudinary.com/dnf68vq7m/image/upload/v1746233510/healthapp/file-sample.jpg"
                    }""")))})
    @PostMapping("/edit")
    public ResponseEntity<CloudinaryResponse> replaceImage(@RequestPart MultipartFile file, @RequestParam String publicId) {
        return imageService.edit(file, publicId);
    }

}
