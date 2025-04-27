package com.healthcare.domain.service.interfaces;

import com.healthcare.domain.dto.response.AppointmentListResponse;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;

import com.healthcare.domain.dto.request.AppointmentRequest;

import java.util.List;
import java.util.Map;

public interface IAppointmentService {
    ResponseEntity<Map<String, Object>> scheduleAppointment(Long patientId, Long medicId, AppointmentRequest appointmentRequest) throws MessagingException;

    ResponseEntity<Map<String, Object>> updateAppointment(Long appointmentId, AppointmentRequest appointmentRequest);

    ResponseEntity<Map<String, Object>> cancelAppointment(Long appointmentId) throws MessagingException;

    ResponseEntity<Map<String, Object>> getAppointmentsByPatient(Long patientId);

    ResponseEntity<List<AppointmentListResponse>> getAppointmentsByMedic(Long medicId);
}