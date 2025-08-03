package com.healthcare.domain.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "diagnostic_images")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DiagnosticImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "diagnosticImages")
    private List<ImagesDiagnostic> images;
}
