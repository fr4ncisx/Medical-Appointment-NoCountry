package com.healthcare.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicationsRequestDTO {
    @NotNull @NotBlank
    private String medicationName;
    @NotNull @NotBlank
    private String dosage;
    @NotNull @NotBlank
    private String frequency;
    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    @NotNull @NotBlank
    private String notes;
}
