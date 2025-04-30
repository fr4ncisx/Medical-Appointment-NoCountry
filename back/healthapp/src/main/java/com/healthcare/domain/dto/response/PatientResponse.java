package com.healthcare.domain.dto.response;

import com.healthcare.domain.model.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String documentId;
    private LocalDate birthDate;
    private Gender gender;
    private String phone;
    private String address;
    private String emergencyContactInfo;
}