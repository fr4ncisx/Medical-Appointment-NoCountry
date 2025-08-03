package com.healthcare.domain.model.entity;

import com.healthcare.domain.dto.request.ScheduleRequest;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Builder
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDate startDate;
    @Column(nullable = false)
    private LocalDate endDate;
    @Column(nullable = false)
    private LocalTime startTime;
    @Column(nullable = false)
    private LocalTime endTime;
    @ManyToOne
    @JoinColumn(name = "medic_id", nullable = false)
    private Medic medic;

    public Schedule(ScheduleRequest scheduleRequest, Medic medic) {
        this.startDate = scheduleRequest.getStartDate();
        this.endDate = scheduleRequest.getEndDate();
        this.startTime = scheduleRequest.getStartTime();
        this.endTime = scheduleRequest.getEndTime();
        this.medic = medic;
    }
}