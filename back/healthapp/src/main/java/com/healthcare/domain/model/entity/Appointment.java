package com.healthcare.domain.model.entity;

import com.healthcare.domain.dto.request.AppointmentRequest;
import com.healthcare.domain.model.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "date", nullable = false)
    private LocalDate date;
    @Column(name = "time", nullable = false)
    private LocalTime time;
    @Column(name = "visit_reason")
    private String visitReason;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    @JoinColumn(name = "medic_id", nullable = false)
    private Medic medic;
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    public Appointment(AppointmentRequest appointmentRequest, Medic medic, Patient patient) {
        this.date = appointmentRequest.getDate();
        this.time = appointmentRequest.getTime();
        this.visitReason = appointmentRequest.getVisitReason();
        this.medic = medic;
        this.patient = patient;
        this.status = Status.CONFIRMADA;
    }
}