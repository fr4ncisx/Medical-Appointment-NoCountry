package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.request.DiagnosticRequest;
import com.healthcare.domain.dto.response.DiagnosticResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface IDiagnosticImagesService {
    ResponseEntity<List<DiagnosticResponse>> getDiagnostics(Long id, Long patientId);
    ResponseEntity<DiagnosticResponse> create(Long patientId, DiagnosticRequest diagnosticRequest);
    ResponseEntity<DiagnosticResponse> update(Long id, DiagnosticRequest diagnosticRequest);
    ResponseEntity<Map<String, String>> delete(Long id);
}
