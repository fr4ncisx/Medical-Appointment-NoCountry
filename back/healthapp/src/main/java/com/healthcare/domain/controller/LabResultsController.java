package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.LabResultsRequest;
import com.healthcare.domain.dto.response.LabResultsResponse;
import com.healthcare.domain.service.interfaces.ILabResultsService;
import com.healthcare.domain.utils.Response;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/labs")
public class LabResultsController {

    private final ILabResultsService labResultsService;

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PostMapping("/{patientId}")
    public ResponseEntity<Map<String, String>> createResult(@PathVariable Long patientId, @RequestBody @Valid LabResultsRequest labResultsRequest) {
        labResultsService.assign(patientId, labResultsRequest);
        return ResponseEntity.ok(Response.create("Resultados cargados con éxito"));
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PutMapping("/{patientId}/{labResultId}")
    public ResponseEntity<Map<String, String>> editResults(@PathVariable Long patientId, @PathVariable Long labResultId, @RequestBody @Valid LabResultsRequest labResultsRequest) {
        labResultsService.edit(patientId, labResultId, labResultsRequest);
        return ResponseEntity.ok(Response.create("Resultados editados con éxito"));
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @DeleteMapping("/{labResultId}")
    public ResponseEntity<Map<String, String>> deleteResults(@PathVariable Long labResultId) {
        labResultsService.delete(labResultId);
        return ResponseEntity.ok(Response.create("Eliminados con éxito"));
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<List<LabResultsResponse>> getAllResults(@PathVariable Long patientId) {
        var response = labResultsService.getAll(patientId);
        return ResponseEntity.ok(response);
    }
}
