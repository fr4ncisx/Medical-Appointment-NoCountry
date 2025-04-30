package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.MedicationsRequestDTO;
import com.healthcare.domain.dto.response.MedicationsResponse;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.Medications;
import com.healthcare.domain.model.entity.Patient;
import com.healthcare.domain.repository.MedicationRepository;
import com.healthcare.domain.repository.PatientRepository;
import com.healthcare.domain.service.interfaces.IMedicationService;

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
public class MedicationServiceImpl implements IMedicationService {

    private final PatientRepository patientRepository;
    private final MedicationRepository medicationRepository;
    private final ModelMapper modelMapper;
    private final CacheManager cacheManager;


    @Transactional
    @Override
    public MedicationsResponse assign(Long patientId, MedicationsRequestDTO medicationsRequest) {
        var patient = getPatient(patientId);
        var savedMeds = medicationRepository.save(new Medications(medicationsRequest, patient));
        patient.getMedications().add(savedMeds);
        patientRepository.save(patient);
        saveCache(patient, patient.getMedications());
        return modelMapper.map(savedMeds, MedicationsResponse.class);
    }

    @Transactional
    @Override
    public void edit(Long patientId, Long medicationId, MedicationsRequestDTO medicationsRequestDTO) {
        var patient = getPatient(patientId);
        var meds = getMedication(medicationId);
        modelMapper.map(medicationsRequestDTO, meds);
        patient.getMedications().add(meds);
        saveCache(patient, patient.getMedications());
        patientRepository.save(patient);
    }

    private void saveCache(Patient patient, List<Medications> medicationsList){
        var cacheName = Optional.ofNullable(cacheManager.getCache("medications"));
        cacheName.ifPresent(cache -> {
            var mappedMedications = medicationsList.stream()
                    .map(m -> modelMapper.map(m, MedicationsResponse.class))
                    .toList();
            cache.put(patient.getId(), mappedMedications);
        });
    }

    @CacheEvict(value = "medications", allEntries = true)
    @Transactional
    @Override
    public void delete(Long medicationId) {
        Medications meds = getMedication(medicationId);
        medicationRepository.delete(meds);
    }

    @Cacheable(value = "medications", key = "#patientId")
    @Override
    public List<MedicationsResponse> getAll(Long patientId) {
        var patient = getPatient(patientId);
        var getMeds = patient.getMedications();
        if (!getMeds.isEmpty()) {
            return getMeds.stream()
                    .map(m -> modelMapper.map(m, MedicationsResponse.class))
                    .toList();
        }
        throw new NotFoundInDatabaseException("La lista de medicamentos está vacía");
    }

    private Patient getPatient(Long id) {
        var patientOpt = patientRepository.findById(id);
        return patientOpt.orElseThrow(() -> new NotFoundInDatabaseException("Paciente no encontrado"));
    }

    private Medications getMedication(Long id) {
        var medsOpt = medicationRepository.findById(id);
        return medsOpt.orElseThrow(() -> new NotFoundInDatabaseException("Medicación no encontrada"));
    }

}
