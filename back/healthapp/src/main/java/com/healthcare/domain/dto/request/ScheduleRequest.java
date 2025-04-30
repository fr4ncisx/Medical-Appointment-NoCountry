package com.healthcare.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleRequest {
    @NotNull private LocalDate startDate;
    @NotNull private LocalDate endDate;
    @NotNull private LocalTime startTime;
    @NotNull private LocalTime endTime;
}