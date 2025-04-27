package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.MedicRequest;
import com.healthcare.domain.dto.request.MedicRequestUpdate;
import com.healthcare.domain.dto.response.MedicResponse;
import com.healthcare.domain.service.interfaces.IMedicService;
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
@RequestMapping("/api/v1/medic")
public class MedicController {

    private final IMedicService medicService;

    @GetMapping
    public ResponseEntity<Map<String, List<MedicResponse>>> getAllMedics(
            @RequestParam(required = false) String speciality,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String state) {
        return medicService.getAllMedics(speciality, gender, state);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MedicResponse>> getMedicById(@PathVariable Long id) {
        return medicService.getMedicById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Map<String, Object>> createMedic(@RequestBody @Valid MedicRequest medicRequest) {
        return medicService.createMedic(medicRequest);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteMedic(@PathVariable Long id) {
        return medicService.deleteMedic(id);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @PutMapping("/{medicId}")
    public ResponseEntity<Map<String,String>> editMedic(@PathVariable Long medicId, @RequestBody @Valid MedicRequestUpdate medicRequest) {
        medicService.edit(medicId, medicRequest);
        return ResponseEntity.ok(Response.create("Médico editado exitosamente"));
    }
}