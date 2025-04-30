package com.healthcare.infrastructure.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RequestLoginDTO(@NotNull @NotBlank String email, @NotNull @NotBlank String password) {}
