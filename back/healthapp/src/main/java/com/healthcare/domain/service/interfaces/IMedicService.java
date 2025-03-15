package com.healthcare.domain.service.interfaces;

import org.springframework.http.ResponseEntity;

import com.healthcare.domain.dto.request.MedicRequest;
import com.healthcare.domain.dto.request.MedicRequestUpdate;

public interface IMedicService {
    ResponseEntity<?> getAllMedics(String speciality, String gender, String state);
    ResponseEntity<?> getMedicById(Long id);
    ResponseEntity<?> createMedic(MedicRequest medicRequest);
    ResponseEntity<?> deleteMedic(Long id);
    void edit(Long id, MedicRequestUpdate medicRequest);
}