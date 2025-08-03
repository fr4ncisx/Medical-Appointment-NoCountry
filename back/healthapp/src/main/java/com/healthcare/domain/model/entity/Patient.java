package com.healthcare.domain.model.entity;

import com.healthcare.domain.dto.request.PatientRequest;
import com.healthcare.domain.model.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String documentId;
    private LocalDate birthDate;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phone;
    private String address;
    private String emergencyContactInfo;
    @OneToOne(cascade = CascadeType.ALL) @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Appointment> appointments;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MedicalRecords> medicalRecords;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LabResults> labResults;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Medications> medications;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DiagnosticImages> diagnosticImages;
    
    public Patient(PatientRequest patientDTO, User user) {
        this.firstName = patientDTO.getFirstName();
        this.lastName = patientDTO.getLastName();
        this.documentId = patientDTO.getDocumentId();
        this.birthDate = patientDTO.getBirthDate();
        this.gender = patientDTO.getGender();
        this.phone = patientDTO.getPhone();
        this.address = patientDTO.getAddress();
        this.emergencyContactInfo = patientDTO.getEmergencyContactInfo();
        this.user = user;
    }
}