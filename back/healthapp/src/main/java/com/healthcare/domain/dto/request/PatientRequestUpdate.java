package com.healthcare.domain.dto.request;

import com.healthcare.domain.model.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRequestUpdate {
    @NotNull @NotBlank private String firstName;
    @NotNull @NotBlank private String lastName;
    @NotNull private LocalDate birthDate;
    @NotNull private Gender gender;
    @NotNull @NotBlank private String phone;
    @NotNull @NotBlank private String address;
    @NotNull @NotBlank private String emergencyContactInfo;
}