package com.healthcare.domain.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images_dx")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
