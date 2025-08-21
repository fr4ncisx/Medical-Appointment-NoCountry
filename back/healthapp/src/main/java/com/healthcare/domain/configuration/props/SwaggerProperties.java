package com.healthcare.domain.configuration.props;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@ConfigurationProperties(prefix = "swagger")
public class SwaggerProperties {
    @SuppressWarnings("unused")
    private String deployUrl;
    @SuppressWarnings("unused")
    private String localhostUrl;
}
