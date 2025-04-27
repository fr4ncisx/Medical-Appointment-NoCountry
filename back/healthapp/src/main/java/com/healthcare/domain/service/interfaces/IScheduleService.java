package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.request.ScheduleRequest;
import com.healthcare.domain.dto.response.ScheduleResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface IScheduleService {
    ResponseEntity<ScheduleResponse> createSchedule(Long medicId, ScheduleRequest scheduleRequest);

    ResponseEntity<List<ScheduleResponse>> getAllSchedulesByMedicId(Long medicId);

    ResponseEntity<ScheduleResponse> getScheduleById(Long scheduleId);

    ResponseEntity<ScheduleResponse> updateSchedule(Long scheduleId, ScheduleRequest scheduleRequest);

    ResponseEntity<Map<String, String>> deleteSchedule(Long scheduleId);
}