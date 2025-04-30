package com.healthcare.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LabResultsResponse {
    private Long id;
    private LocalDate resultDate;
    private String testType;
    private String results;
}
