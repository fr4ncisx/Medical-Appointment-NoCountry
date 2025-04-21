package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.PatientRequest;
import com.healthcare.domain.dto.request.PatientRequestUpdate;
import com.healthcare.domain.service.interfaces.IPatientService;
import com.healthcare.domain.utils.Response;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/patient")
public class PatientController {

    private final IPatientService patientService;

    @PreAuthorize("hasAnyRole({'ADMIN', 'MEDICO'})")
    @GetMapping
    public ResponseEntity<?> getAllPatients(){
        return patientService.getAllPatients();
    }
    
    @PreAuthorize("hasAnyRole({'ADMIN', 'PACIENTE'}) and @securityOwnership.isSamePatientId(#id)")
    @GetMapping("/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Long id){
        return patientService.getPatientById(id);
    }
    
    @PostMapping
    public ResponseEntity<?> createPatient(@RequestBody @Valid PatientRequest patientDTO) throws MessagingException {
        return patientService.createPatient(patientDTO);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'}) and @securityOwnership.isSamePatientId(#id)")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        return patientService.deletePatient(id);
    }

    @PreAuthorize("hasAnyRole({'ADMIN', 'PACIENTE'}) and @securityOwnership.isSamePatientId(#patientId)")
    @PutMapping("/{patientId}")
    public ResponseEntity<Map<String, String>> editPatient(@PathVariable Long patientId, @RequestBody @Valid PatientRequestUpdate patient) {
        patientService.edit(patientId, patient);
        return ResponseEntity.ok(Response.create("Paciente editado exitosamente"));
    }
}