package com.healthcare.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ImagesDiagnosticResponse {
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime date;
    private String url;
}
