package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.PatientRequest;
import com.healthcare.domain.dto.request.PatientRequestUpdate;
import com.healthcare.domain.dto.request.UserRequest;
import com.healthcare.domain.dto.response.PatientResponse;
import com.healthcare.domain.exceptions.DuplicatedEntryEx;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.exceptions.PatientNotFoundException;
import com.healthcare.domain.model.entity.Patient;
import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.PatientRepository;
import com.healthcare.domain.repository.UserRepository;
import com.healthcare.domain.service.interfaces.IPatientService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PatientServiceImpl implements IPatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final CacheManager cacheManager;

    @Value("${email.sendEmail}")
    private boolean sendEmail;

    @Cacheable("all-patients")
    @Override
    public ResponseEntity<Map<String, List<PatientResponse>>> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientResponse> response = patients.stream()
                .map(patientEntity -> modelMapper.map(patientEntity, PatientResponse.class))
                .toList();
        if (response.isEmpty()) {
            throw new NotFoundInDatabaseException("Pacientes no encontrados");
        }

        return ResponseEntity.ok(Map.of("patients", response));
    }

    @Cacheable(value = "one-patient", key = "#id")
    @Override
    public ResponseEntity<Map<String, PatientResponse>> getPatientById(Long id){
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));
        var patientDTO = modelMapper.map(patient, PatientResponse.class);
        return ResponseEntity.ok(Map.of("patient", patientDTO));
    }

    @Caching(evict = {
            @CacheEvict(value = "all-users", allEntries = true),
            @CacheEvict(value = "all-patients", allEntries = true)
    })
    @Override
    @Transactional
    public ResponseEntity<Map<String, PatientResponse>> createPatient(PatientRequest patientRequest) throws MessagingException {
        assertValidation(patientRequest);
        var patient = savePatientInDatabase(patientRequest);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(patient);
    }

    @Caching(evict = {
            @CacheEvict(value = "one-patient", allEntries = true),
            @CacheEvict(value = "all-patients", allEntries = true)
    })
    @Override
    @Transactional
    public ResponseEntity<Map<String, String>> deletePatient(Long id) {
        var patient = notNull(id);
        patientRepository.delete(patient);
        return ResponseEntity.ok(Map.of("message", "Paciente eliminado con éxito"));
    }

    @Override
    @Transactional
    public void edit(Long id, PatientRequestUpdate patientRequest) {
        var patient = notNull(id);
        modelMapper.map(patientRequest, patient);
        patientRepository.save(patient);
    }

    private Patient notNull(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));
    }

    private void assertValidation(PatientRequest patientRequest) {
        if (patientRepository.existsByDocumentId(patientRequest.getDocumentId())) {
            throw new DuplicatedEntryEx("Paciente ya registrado");
        }
        if (userRepository.existsByEmail(patientRequest.getUser().getEmail())) {
            throw new DuplicatedEntryEx("El correo ya esta asociado a una cuenta");
        }
        var isAnAdult = patientRequest.getBirthDate().plusYears(18);
        if (isAnAdult.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("El paciente no es mayor de edad");
        }
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private Map<String, PatientResponse> savePatientInDatabase(PatientRequest patientRequest) throws MessagingException {
        UserRequest userRequest = patientRequest.getUser();
        User user = new User(userRequest, encodePassword(userRequest.getPassword()), Role.PACIENTE);

        var patient = patientRepository.save(new Patient(patientRequest, user));
        var patientDTO = Map.of("patient", modelMapper.map(patient, PatientResponse.class));

        savePatientCache(patient, patientDTO);
        sendEmailAfterRegister(patient);
        return patientDTO;
    }

    private void savePatientCache(Patient patient, Map<String, PatientResponse> cacheablePatient){
        var patientCache = Optional.ofNullable(cacheManager.getCache("one-patient"));

        patientCache.ifPresent(cache -> cache.put(patient.getId(), ResponseEntity.ok(cacheablePatient)));
    }

    private void sendEmailAfterRegister(Patient p) throws MessagingException {
        if (sendEmail) {
            String email = p.getUser().getEmail();
            mailService.sendMailRegister(email, "Confirmación de usuario registrado", p);
        }
    }
}