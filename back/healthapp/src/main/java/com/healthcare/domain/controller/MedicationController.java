package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.MedicationsRequestDTO;
import com.healthcare.domain.dto.response.MedicationsResponse;
import com.healthcare.domain.service.interfaces.IMedicationService;
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
@RequestMapping("/api/v1/medication")
public class MedicationController {

    private final IMedicationService medicationService;

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PostMapping("{patientId}")
    public ResponseEntity<MedicationsResponse> assignMedication(@PathVariable Long patientId,
                                                                @RequestBody @Valid MedicationsRequestDTO medicationsRequestDTO) {
        var response = medicationService.assign(patientId, medicationsRequestDTO);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PutMapping("{patientId}/{medicationId}")
    public ResponseEntity<Map<String, String>> editMedication(@PathVariable Long patientId,
                                                              @PathVariable Long medicationId,
                                                              @RequestBody @Valid MedicationsRequestDTO medicationsRequestDTO) {
        medicationService.edit(patientId, medicationId, medicationsRequestDTO);
        return ResponseEntity.ok(Response.create("Medicación editada exitosamente"));
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @DeleteMapping("/{medicationId}")
    public ResponseEntity<Map<String, String>> deleteMedication(@PathVariable Long medicationId) {
        medicationService.delete(medicationId);
        return ResponseEntity.ok(Response.create("Medicación eliminada correctamente"));        
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @GetMapping("{patientId}")
    public ResponseEntity<List<MedicationsResponse>>getMedications(@PathVariable Long patientId){
        var responseBody = medicationService.getAll(patientId);
        return ResponseEntity.ok(responseBody);
    }

}
