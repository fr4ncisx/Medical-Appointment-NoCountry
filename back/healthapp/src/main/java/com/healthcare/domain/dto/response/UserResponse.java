package com.healthcare.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.healthcare.domain.model.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    private Long id;
    private String email;
    private Role role;
    private PatientShortResponse patient;
    private MedicShortResponse medic;
}
