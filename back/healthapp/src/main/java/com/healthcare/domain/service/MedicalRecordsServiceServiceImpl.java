package com.healthcare.domain.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.healthcare.domain.dto.request.MedicalRecordsRequest;
import com.healthcare.domain.dto.response.MedicalRecordsReponse;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.MedicalRecords;
import com.healthcare.domain.model.entity.Patient;
import com.healthcare.domain.repository.PatientRepository;
import com.healthcare.domain.service.interfaces.IMedicalRecordsService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MedicalRecordsServiceServiceImpl implements IMedicalRecordsService {

    private final ModelMapper modelMapper;
    private final PatientRepository patientRepository;
    private final CacheManager cacheManager;

    @Cacheable(value = "medical-records", key = "#patientId")
    @Override
    public List<MedicalRecordsReponse> retrieveRecords(Long patientId) {
        var listOfRecords = getPatient(patientId).getMedicalRecords();
        Assert.notEmpty(listOfRecords, "No se encontró ningún historial médico");
        return listOfRecords.stream()
                .map(records -> modelMapper.map(records, MedicalRecordsReponse.class))
                .toList();
    }

    @Override
    public void createMedicalRecord(Long patientId, MedicalRecordsRequest request) {
        Patient patient = getPatient(patientId);
        MedicalRecords medicalRecords = new MedicalRecords(request, patient);
        patient.getMedicalRecords().add(medicalRecords);
        patient = patientRepository.save(patient);
        saveCache(patient, patient.getMedicalRecords());
    }

    private void saveCache(Patient patient, List<MedicalRecords> medicalRecordsList){
        Optional.ofNullable(cacheManager.getCache("medical-records"))
                .ifPresent(c -> c.put(patient.getId(), medicalRecordsList.stream()
                        .map(records -> modelMapper.map(records, MedicalRecordsReponse.class))
                        .toList()));
    }

    private Patient getPatient(Long id) {
        Optional<Patient> patientOpt = patientRepository.findById(id);
        return patientOpt.orElseThrow(() -> new NotFoundInDatabaseException("Paciente no encontrado"));
    }


}
