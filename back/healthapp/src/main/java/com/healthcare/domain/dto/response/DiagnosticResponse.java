package com.healthcare.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiagnosticResponse {
    private Long id;
    private PatientShortResponse patient;
    private List<ImagesDiagnosticResponse> images;
}
