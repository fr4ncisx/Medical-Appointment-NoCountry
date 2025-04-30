package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.request.MedicationsRequestDTO;
import com.healthcare.domain.dto.response.MedicationsResponse;

import java.util.List;

public interface IMedicationService {
    MedicationsResponse assign(Long patientId, MedicationsRequestDTO medicationsRequest);

    void delete(Long medicationId);

    void edit(Long patientId, Long medicationId, MedicationsRequestDTO medicationsRequestDTO);

    List<MedicationsResponse> getAll(Long patientId);
}
