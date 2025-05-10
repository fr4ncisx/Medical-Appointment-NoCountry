package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.PatientRequest;
import com.healthcare.domain.dto.request.UserRequest;
import com.healthcare.domain.model.entity.Patient;
import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Gender;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.PatientRepository;
import com.healthcare.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@DataJpaTest
class PatientServiceImplTest {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private UserRepository userRepository;

    private Patient mockPatient;

    @BeforeEach
    void setUp() {
        UserRequest userRequest = new UserRequest("bedoya@gmail.com", new BCryptPasswordEncoder()
                .encode("12345"));
        User mockUser = new User("bedoya@gmail.com", new BCryptPasswordEncoder().encode("12345"), Role.ADMIN);
        PatientRequest patientRequest = new PatientRequest("Carlos", "Bedoya",
                "1234567", LocalDate.now(), Gender.MALE, "45536548",
                "Avenida Galicia 3120", "No contiene", userRequest);
        mockPatient = new Patient(patientRequest, mockUser);
        patientRepository.save(mockPatient);
    }

    @Test
    void createPatient(){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Patient savedPatient = patientRepository.findById(mockPatient.getId()).orElse(null);
        var userFound = userRepository.findById(mockPatient.getUser().getId());
        assertTrue(userFound.isPresent(), "User was found");
        assertNotNull(savedPatient);
        assertTrue(passwordEncoder.matches("12345", savedPatient.getUser().getPassword()));
        assertNotNull(savedPatient);
        assertEquals(mockPatient.getFirstName(), savedPatient.getFirstName());
    }

    @Test
    void deletePatient() {
        patientRepository.delete(mockPatient);
        var patientDeleted = patientRepository.findById(mockPatient.getId());
        assertFalse(patientDeleted.isPresent());
    }
}