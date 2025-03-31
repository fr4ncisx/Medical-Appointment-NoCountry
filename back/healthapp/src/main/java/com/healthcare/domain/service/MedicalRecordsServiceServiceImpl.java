package com.healthcare.domain.service;

import java.util.List;
import java.util.Optional;

import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.infrastructure.security.utils.JwtUtils;
import org.modelmapper.ModelMapper;
import org.springframework.security.authorization.AuthorizationDeniedException;
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
    private final JwtUtils jwtUtils;

    @Override
    public List<MedicalRecordsReponse> retrieveRecords(Long patientId, String token) {
        var userFromToken = getUser(token);
        if(userFromToken.getRole().equals(Role.PACIENTE))
            validateTokenPatientId(token, patientId);
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
        patientRepository.save(patient);
    }

    private Patient getPatient(Long id) {
        Optional<Patient> patientOpt = patientRepository.findById(id);
        return patientOpt.orElseThrow(() -> new NotFoundInDatabaseException("Paciente no encontrado"));
    }

    private void validateTokenPatientId(String token, Long patientId){
        User loggedUser = getUser(token);
        boolean userIsPatient = loggedUser.getRole().toString().equals("PACIENTE");
        boolean userIdNotEquals = !loggedUser.getPatient().getId().equals(patientId);
        if (userIsPatient && userIdNotEquals) {
            throw new AuthorizationDeniedException("No está habilitado para ver historial medico de otro paciente");
        }
    }
    private User getUser(String token){
        return jwtUtils.getUserDetails(token);
    }
}
