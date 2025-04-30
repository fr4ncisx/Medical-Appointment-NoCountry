package com.healthcare.domain.dto.response;

import com.healthcare.domain.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentResponse {
    private Long id;
    private LocalDate date;
    private LocalTime time;
    private String visitReason;
    private Status status;
}
