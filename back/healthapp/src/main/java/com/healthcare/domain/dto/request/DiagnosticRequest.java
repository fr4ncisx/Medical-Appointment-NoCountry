package com.healthcare.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DiagnosticRequest {
    @NotNull
    private List<ImagesDiagnosticRequest> images;
}
