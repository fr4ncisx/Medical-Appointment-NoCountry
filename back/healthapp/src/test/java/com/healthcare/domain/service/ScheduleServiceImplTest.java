package com.healthcare.domain.service;

import com.healthcare.domain.model.entity.Medic;
import com.healthcare.domain.model.entity.Schedule;
import com.healthcare.domain.repository.MedicRepository;
import com.healthcare.domain.repository.ScheduleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
class ScheduleServiceImplTest {

    @Autowired
    private MedicRepository medicRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    private Medic mockMedic;
    private Schedule mockSchedule;

    @BeforeEach
    void setUp() {
        scheduleRepository.deleteAll();
        medicRepository.deleteAll();

        mockMedic = new Medic();
        mockMedic.setName("Carlos");
        mockMedic.setLastName("Solis");
        mockMedic = medicRepository.save(mockMedic);

        mockSchedule = Schedule.builder()
                .startDate(LocalDate.of(2025, 3, 11))
                .startTime(LocalTime.of(9, 15))
                .endDate(LocalDate.of(2025, 3, 11))
                .endTime(LocalTime.of(13, 0))
                .medic(mockMedic)
                .build();
        mockSchedule.setMedic(mockMedic);

    }

    @Test
    void createSchedule() {
        Schedule newSchedule = new Schedule();
        newSchedule.setStartDate(LocalDate.of(2025, 3, 11));
        newSchedule.setEndDate(LocalDate.of(2025, 3, 11));
        newSchedule.setStartTime(LocalTime.of(10, 0));
        newSchedule.setEndTime(LocalTime.of(15, 0));
        newSchedule.setMedic(mockMedic);

        scheduleRepository.save(newSchedule);

        boolean checkTimeRange = checkTimeRange(mockSchedule, newSchedule);
        assertTrue(checkTimeRange, "Los horarios deberían cruzarse");
    }

    private boolean checkTimeRange(Schedule existingSchedule, Schedule newSchedule) {
        if (existingSchedule.getStartDate().equals(newSchedule.getStartDate())) {
            return newSchedule.getStartTime().isBefore(existingSchedule.getEndTime()) &&
                    newSchedule.getEndTime().isAfter(existingSchedule.getStartTime());
        }
        return false;
    }

}
