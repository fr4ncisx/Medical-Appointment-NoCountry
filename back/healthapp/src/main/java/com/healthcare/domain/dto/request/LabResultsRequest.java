package com.healthcare.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LabResultsRequest {
    @NotNull
    private LocalDate resultDate;
    @NotNull @NotBlank
    private String testType;
    @NotNull @NotBlank
    private String results;
}

