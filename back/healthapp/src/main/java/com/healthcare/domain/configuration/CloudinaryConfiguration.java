package com.healthcare.domain.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfiguration {

    @Value("${cloudinary.url}")
    private String CLOUDINARY_URL;

    @Bean
    Cloudinary cloudinary(){
        return new Cloudinary(CLOUDINARY_URL);
    }
}
