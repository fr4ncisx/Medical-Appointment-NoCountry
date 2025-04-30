package com.healthcare.infrastructure.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ResponseTokenDTO(String token, String error) {}
