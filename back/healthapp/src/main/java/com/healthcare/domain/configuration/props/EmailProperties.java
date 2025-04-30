package com.healthcare.domain.configuration.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:email.properties")
@ConfigurationProperties(prefix = "email")
public class EmailProperties {
    @SuppressWarnings("unused")
    private String username;
    @SuppressWarnings("unused")
    private String password;
    @SuppressWarnings("unused")
    private boolean sendEmail;
}
