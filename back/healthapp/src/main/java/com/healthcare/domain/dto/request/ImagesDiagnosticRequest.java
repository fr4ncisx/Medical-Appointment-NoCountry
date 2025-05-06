package com.healthcare.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ImagesDiagnosticRequest {
    @JsonIgnore
    private LocalDateTime date;
    @NotBlank
    @NotNull
    private String url;
}
