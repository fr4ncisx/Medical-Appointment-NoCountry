package com.healthcare.domain.model.entity;

import com.healthcare.domain.dto.request.MedicationsRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Medications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "medication_name")
    private String medicationName;
    private String dosage;
    private String frequency;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    private String notes;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public Medications(MedicationsRequestDTO medicationsRequest, Patient patient) {
        this.medicationName = medicationsRequest.getMedicationName();
        this.dosage = medicationsRequest.getDosage();
        this.frequency = medicationsRequest.getFrequency();
        this.startDate = medicationsRequest.getStartDate();
        this.endDate = medicationsRequest.getEndDate();
        this.notes = medicationsRequest.getNotes();
        this.patient = patient;
    }
}
