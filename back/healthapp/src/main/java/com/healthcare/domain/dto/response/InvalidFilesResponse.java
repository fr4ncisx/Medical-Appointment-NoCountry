package com.healthcare.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InvalidFilesResponse {
    @JsonProperty(value = "Archivo")
    String fileName;
    @JsonProperty(value = "Error")
    String error;
}
