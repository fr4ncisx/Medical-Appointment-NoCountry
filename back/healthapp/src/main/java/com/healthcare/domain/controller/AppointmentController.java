package com.healthcare.domain.controller;

import com.healthcare.domain.dto.request.AppointmentRequest;
import com.healthcare.domain.dto.response.AppointmentListResponse;
import com.healthcare.domain.service.interfaces.IAppointmentService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

    private final IAppointmentService appointmentService;

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO','PACIENTE'}) and @securityOwnership.isSamePatientId(#patientId)")
    @PostMapping("/schedule")
    public ResponseEntity<Map<String, Object>> scheduleAppointment(@RequestParam Long patientId, @RequestParam Long medicId,
                                                                   @RequestBody @Valid AppointmentRequest appointmentRequest) throws MessagingException {
        return appointmentService.scheduleAppointment(
                patientId,
                medicId, appointmentRequest);
    }
    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO','PACIENTE'})")
    @PutMapping("/update/{appointmentId}")
    public ResponseEntity<Map<String, Object>> updateAppointment(
            @PathVariable Long appointmentId,
            @RequestBody @Valid AppointmentRequest appointmentRequest) {
        return appointmentService.updateAppointment(
                appointmentId,
                appointmentRequest);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO','PACIENTE'})")
    @PutMapping("/cancel/{appointmentId}")
    public ResponseEntity<Map<String, Object>> cancelAppointment(@PathVariable Long appointmentId) throws MessagingException {
        return appointmentService.cancelAppointment(appointmentId);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO','PACIENTE'}) and @securityOwnership.isSamePatientId(#patientId)")
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Map<String, Object>> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @PreAuthorize("hasAnyRole({'ADMIN','MEDICO'})")
    @GetMapping("/{medicId}")
    public ResponseEntity<List<AppointmentListResponse>> getAppointmentsByMedic(@PathVariable Long medicId) {
        return appointmentService.getAppointmentsByMedic(medicId);
    }
}