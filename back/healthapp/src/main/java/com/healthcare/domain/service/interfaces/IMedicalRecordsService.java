package com.healthcare.domain.service.interfaces;

import java.util.List;

import com.healthcare.domain.dto.request.MedicalRecordsRequest;
import com.healthcare.domain.dto.response.MedicalRecordsReponse;

public interface IMedicalRecordsService {
    List<MedicalRecordsReponse> retrieveRecords(Long patientId);

    void createMedicalRecord(Long patientId, MedicalRecordsRequest request);
}
