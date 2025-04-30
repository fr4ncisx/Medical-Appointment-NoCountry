package com.healthcare.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequest {
    @NotNull
    private LocalDate date;
    @NotNull
    private LocalTime time;
    @NotBlank @NotNull
    private String visitReason;
}
