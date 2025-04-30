package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.ScheduleRequest;
import com.healthcare.domain.dto.response.ScheduleResponse;
import com.healthcare.domain.service.ScheduleServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/schedule")
public class ScheduleController {

    private final ScheduleServiceImpl scheduleService;

    @PreAuthorize("hasAnyRole({'ADMIN', 'MEDICO'})")
    @PostMapping("/{medicId}")
    public ResponseEntity<ScheduleResponse> createSchedule(
            @PathVariable Long medicId, @RequestBody @Valid ScheduleRequest scheduleRequest) {
        return scheduleService.createSchedule(medicId, scheduleRequest);
    }

    @GetMapping("/medic/{medicId}")
    public ResponseEntity<List<ScheduleResponse>> getAllSchedulesByMedicId(@PathVariable Long medicId) {
        return scheduleService.getAllSchedulesByMedicId(medicId);
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> getScheduleById(@PathVariable Long scheduleId) {
        return scheduleService.getScheduleById(scheduleId);
    }

    @PreAuthorize("hasAnyRole({'ADMIN', 'MEDICO'})")
    @PutMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> updateSchedule(
            @PathVariable Long scheduleId, @RequestBody @Valid ScheduleRequest scheduleRequest) {
        return scheduleService.updateSchedule(scheduleId, scheduleRequest);
    }

    @PreAuthorize("hasAnyRole({'ADMIN', 'MEDICO'})")
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Map<String, String>> deleteSchedule(@PathVariable Long scheduleId) {
        return scheduleService.deleteSchedule(scheduleId);
    }
}