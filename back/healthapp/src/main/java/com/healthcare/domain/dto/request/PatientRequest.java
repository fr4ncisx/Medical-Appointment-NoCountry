package com.healthcare.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.healthcare.domain.model.enums.Gender;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRequest {
    @NotNull @NotBlank private String firstName;
    @NotNull @NotBlank private String lastName;
    @NotNull @NotBlank @PositiveOrZero
    private String documentId;
    @NotNull @Past private LocalDate birthDate;
    @NotNull private Gender gender;
    @NotNull @NotBlank private String phone;
    @NotNull @NotBlank private String address;
    @NotNull @NotBlank private String emergencyContactInfo;
    @JsonProperty("user")
    @NotNull @Valid private UserRequest user;
}