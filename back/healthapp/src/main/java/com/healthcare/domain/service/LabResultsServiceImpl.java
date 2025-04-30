package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.LabResultsRequest;
import com.healthcare.domain.dto.response.LabResultsResponse;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.LabResults;
import com.healthcare.domain.model.entity.Patient;
import com.healthcare.domain.repository.LabResultsRepository;
import com.healthcare.domain.repository.PatientRepository;
import com.healthcare.domain.service.interfaces.ILabResultsService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LabResultsServiceImpl implements ILabResultsService {

    private final PatientRepository patientRepository;
    private final LabResultsRepository labResultsRepository;
    private final ModelMapper modelMapper;
    private final CacheManager cacheManager;

    @Cacheable(value = "labResults", key= "#patientId")
    @Override
    public List<LabResultsResponse> getAll(Long patientId) {
        var patient = getPatient(patientId);
        var getResults = patient.getLabResults();
        if (!getResults.isEmpty()) {
            return getResults.stream()
                    .map(m -> modelMapper.map(m, LabResultsResponse.class))
                    .toList();
        }
        throw new NotFoundInDatabaseException("No hay resultados de laboratorio");
    }

    @Transactional
    @Override
    public void assign(Long patientId, LabResultsRequest labResultsRequest) {
        var patient = getPatient(patientId);
        LabResults labResults = new LabResults(labResultsRequest, patient);
        patient.getLabResults().add(labResults);
        saveCache(patient, patient.getLabResults());
        patient = patientRepository.save(patient);
        saveCache(patient, patient.getLabResults());
    }

    @Transactional
    @Override
    public void edit(Long patientId, Long labResultId, LabResultsRequest labResultsRequest) {
        var patient = getPatient(patientId);
        var labResult = getLabResult(labResultId);
        modelMapper.map(labResultsRequest, labResult);
        patient.getLabResults().add(labResult);
        patient = patientRepository.save(patient);
        saveCache(patient, patient.getLabResults());
    }

    @CacheEvict(value = "labResults", allEntries = true)
    @Transactional
    @Override
    public void delete(Long labResultId) {
        var labs = getLabResult(labResultId);
        labResultsRepository.delete(labs);
    }

    private void saveCache(Patient patient, List<LabResults> medicationsList){
        var cacheName = Optional.ofNullable(cacheManager.getCache("labResults"));
        cacheName.ifPresent(cache -> {
            var mappedLabResults = medicationsList.stream()
                    .map(m -> modelMapper.map(m, LabResultsResponse.class))
                    .toList();
            cache.put(patient.getId(), mappedLabResults);
        });
    }

    private Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new NotFoundInDatabaseException("Paciente no encontrado"));
    }

    private LabResults getLabResult(Long id) {
        return labResultsRepository.findById(id)
                .orElseThrow(() -> new NotFoundInDatabaseException("Resultado de laboratorio no encontrado"));
    }
}
