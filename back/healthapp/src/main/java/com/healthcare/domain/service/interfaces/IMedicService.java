package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.response.MedicResponse;
import org.springframework.http.ResponseEntity;

import com.healthcare.domain.dto.request.MedicRequest;
import com.healthcare.domain.dto.request.MedicRequestUpdate;

import java.util.List;
import java.util.Map;

public interface IMedicService {
    ResponseEntity<Map<String, List<MedicResponse>>> getAllMedics(String speciality, String gender, String state);

    ResponseEntity<Map<String, MedicResponse>> getMedicById(Long id);

    ResponseEntity<Map<String, Object>> createMedic(MedicRequest medicRequest);

    ResponseEntity<Map<String, String>> deleteMedic(Long id);

    void edit(Long id, MedicRequestUpdate medicRequest);
}