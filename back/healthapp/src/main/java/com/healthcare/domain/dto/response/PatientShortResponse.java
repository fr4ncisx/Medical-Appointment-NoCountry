package com.healthcare.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientShortResponse {
    private Long id;
    private String firstName;
    private String lastName;
}