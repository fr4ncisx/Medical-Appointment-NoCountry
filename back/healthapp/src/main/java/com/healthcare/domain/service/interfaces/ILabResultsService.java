package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.request.LabResultsRequest;
import com.healthcare.domain.dto.response.LabResultsResponse;

import java.util.List;

public interface ILabResultsService {
    void assign(Long patientId, LabResultsRequest labResultsRequest);

    void edit(Long patientId, Long labResultId, LabResultsRequest labResultsRequest);

    void delete(Long labResultId);

    List<LabResultsResponse> getAll(Long patientId);

}
