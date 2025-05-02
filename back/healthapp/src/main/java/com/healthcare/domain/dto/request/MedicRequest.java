package com.healthcare.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.healthcare.domain.model.enums.Gender;
import com.healthcare.domain.model.enums.Speciality;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicRequest{
    @NotNull @NotBlank private String name;
    @NotNull @NotBlank private String lastname;
    @NotNull @NotBlank private String description;
    @NotNull @NotBlank private String state;
    @NotNull @NotBlank @PositiveOrZero
    private String documentId;
    @NotNull private Gender gender;
    @NotNull private Speciality speciality;
    @NotNull @NotBlank private String phone;
    @NotNull @Valid private ImageRequest image;
    @JsonProperty("user")
    @NotNull @Valid private UserRequest user;
}