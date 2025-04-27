package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.request.PatientRequestUpdate;

import com.healthcare.domain.dto.response.PatientResponse;
import jakarta.mail.MessagingException;

import org.springframework.http.ResponseEntity;

import com.healthcare.domain.dto.request.PatientRequest;

import java.util.List;
import java.util.Map;

public interface IPatientService {
    ResponseEntity<Map<String, List<PatientResponse>>> getAllPatients();

    ResponseEntity<Map<String, PatientResponse>> getPatientById(Long id);

    ResponseEntity<Map<String, Object>> createPatient(PatientRequest patientDTO) throws MessagingException;

    ResponseEntity<Map<String, String>> deletePatient(Long id);

    void edit(Long id, PatientRequestUpdate patientRequest);
}