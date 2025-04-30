package com.healthcare.domain.repository;

import com.healthcare.domain.model.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s " +
            "WHERE s.medic.id = :medicId " +
            "AND :date BETWEEN s.startDate AND s.endDate " +
            "AND :time BETWEEN s.startTime AND s.endTime " +
            "AND NOT EXISTS (" +
            "SELECT a FROM Appointment a " +
            "WHERE a.medic.id = s.medic.id " +
            "AND a.date = :date " +
            "AND a.time = :time " +
            "AND a.status IN ('CANCELADA', 'COMPLETADA')" +
            ")")
    List<Schedule> findAvailableSchedules(Long medicId, LocalDate date, LocalTime time);

}