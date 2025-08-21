package com.healthcare.domain.configuration;

import com.healthcare.domain.configuration.props.SwaggerProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

        private final SwaggerProperties swaggerProps;

//        @Value("${swagger.deployUrl}")
//        private String deployUrl;
//        @Value("${swagger.localhostUrl}")
//        private String localhostUrl;

        @Bean
        OpenAPI customOpenAPI() {
                return new OpenAPI()
                                .addServersItem(new Server().url(swaggerProps.getDeployUrl()).description("Deploy server"))
                                .addServersItem(new Server().url(swaggerProps.getLocalhostUrl()).description("Local server"))
                                .components(new Components()
                                                .addSecuritySchemes("bearer-key",
                                                                new SecurityScheme()
                                                                                .type(SecurityScheme.Type.HTTP)
                                                                                .scheme("bearer")
                                                                                .bearerFormat("JWT")))
                                .addSecurityItem(new SecurityRequirement().addList("bearer-key"));
        }
}
