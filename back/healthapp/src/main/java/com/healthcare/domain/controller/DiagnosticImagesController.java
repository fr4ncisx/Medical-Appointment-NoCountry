package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.DiagnosticRequest;
import com.healthcare.domain.dto.response.DiagnosticResponse;
import com.healthcare.domain.service.interfaces.IDiagnosticImagesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/diagnostic")
@RequiredArgsConstructor
public class DiagnosticImagesController {
    private final IDiagnosticImagesService diagnosticImagesService;

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @GetMapping
    public ResponseEntity<List<DiagnosticResponse>> getDiagnostic(@RequestParam(required = false) Long id, @RequestParam(required = false) Long patientId) {
        return diagnosticImagesService.getDiagnostics(id, patientId);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PostMapping
    public ResponseEntity<DiagnosticResponse> create(@RequestParam Long patientId, @RequestBody @Valid DiagnosticRequest diagnosticRequest) {
        return diagnosticImagesService.create(patientId, diagnosticRequest);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PutMapping
    public ResponseEntity<DiagnosticResponse> edit(@RequestParam Long id, @RequestBody @Valid DiagnosticRequest diagnosticRequest) {
        return diagnosticImagesService.update(id, diagnosticRequest);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @DeleteMapping
    public ResponseEntity<Map<String,String>> delete(@RequestParam Long id) {
        return diagnosticImagesService.delete(id);
    }

}
