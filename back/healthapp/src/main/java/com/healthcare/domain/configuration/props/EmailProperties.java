package com.healthcare.domain.configuration.props;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@ConfigurationProperties(prefix = "email")
public class EmailProperties {
    @SuppressWarnings("unused")
    private String username;
    @SuppressWarnings("unused")
    private String password;
    @SuppressWarnings("unused")
    private boolean sendEmail;
}
