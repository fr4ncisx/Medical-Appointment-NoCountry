package com.healthcare.domain.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer{

    @Value("${cors.frontend.ip}")
    private String deployFrontIP;
    @Value("${cors.backend.ip}")
    private String deployBackendIP;
    @Value("${cors.frontend.local}")
    private String frontendLocalIP;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        .allowedOrigins(deployFrontIP,deployBackendIP,frontendLocalIP)
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT")
        .allowedHeaders("*");
    }
}
