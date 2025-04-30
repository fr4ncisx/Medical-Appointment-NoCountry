package com.healthcare.domain.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class JavaMailConfig {

    @Value("${email.username}")
    private String email;

    @Value("${email.password}")
    private String smtpPassword;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl javaMail = new JavaMailSenderImpl();
        javaMail.setHost("smtp.zoho.com");
        javaMail.setPort(587);

        javaMail.setUsername(email);
        javaMail.setPassword(smtpPassword);

        Properties props = javaMail.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return javaMail;
    }
}
