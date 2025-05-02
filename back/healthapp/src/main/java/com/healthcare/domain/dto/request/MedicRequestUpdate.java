package com.healthcare.domain.dto.request;

import com.healthcare.domain.model.enums.Gender;
import com.healthcare.domain.model.enums.Speciality;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicRequestUpdate{
    @NotNull @NotBlank private String name;
    @NotNull @NotBlank private String lastname;
    @NotNull @NotBlank private String description;
    @NotNull @NotBlank private String state;
    @NotNull private Gender gender;
    @NotNull private Speciality speciality;
    @NotNull @NotBlank private String phone;
    @NotNull private ImageRequest image;
}