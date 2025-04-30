package com.healthcare.domain.dto.response;

import com.healthcare.domain.model.enums.Gender;
import com.healthcare.domain.model.enums.Speciality;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicResponse {
    private Long id;
    private String name;
    private String lastname;
    private String description;
    private String state;
    private String documentId;
    Gender gender;
    Speciality speciality;
    private String phone;
}