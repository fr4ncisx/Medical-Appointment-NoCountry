package com.healthcare.domain.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "images_dx")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ImagesDiagnostic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime date;
    private String url;
    @ManyToOne
    @JoinColumn(name = "diagnostic_id")
    DiagnosticImages diagnosticImages;
}
