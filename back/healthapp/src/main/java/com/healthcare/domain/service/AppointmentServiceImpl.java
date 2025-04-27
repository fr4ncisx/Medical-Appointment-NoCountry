package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.AppointmentRequest;
import com.healthcare.domain.dto.response.AppointmentListResponse;
import com.healthcare.domain.dto.response.AppointmentResponse;
import com.healthcare.domain.exceptions.*;
import com.healthcare.domain.model.entity.Appointment;
import com.healthcare.domain.model.entity.Medic;
import com.healthcare.domain.model.entity.Patient;
import com.healthcare.domain.model.enums.Status;
import com.healthcare.domain.repository.AppointmentRepository;
import com.healthcare.domain.repository.MedicRepository;
import com.healthcare.domain.repository.PatientRepository;
import com.healthcare.domain.repository.ScheduleRepository;
import com.healthcare.domain.service.interfaces.IAppointmentService;

import com.healthcare.infrastructure.security.service.SecurityOwnership;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AppointmentServiceImpl implements IAppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final MedicRepository medicRepository;
    private final PatientRepository patientRepository;
    private final ScheduleRepository scheduleRepository;
    private final ModelMapper modelMapper;
    private final MailService mailService;
    private final SecurityOwnership securityOwnership;

    @Value("${email.sendEmail}")
    private boolean sendEmail;
    private static final String MESSAGE = "message";
    private static final String APPOINTMENT = "appointment";
    private static final String APPOINTMENTS = "appointments";

    @Override
    @Transactional
    public ResponseEntity<Map<String, Object>> scheduleAppointment(Long patientId, Long medicId, AppointmentRequest appointmentRequest) throws MessagingException {
        var medic = getMedicFromRepository(medicId);
        var patient = getPatientFromRepository(patientId);
        isTimeTaken(medic, appointmentRequest);
        outOfTimeRangeValidation(medicId, appointmentRequest.getDate(), appointmentRequest.getTime());
        Appointment appointment = new Appointment(appointmentRequest, medic, patient);
        appointmentRepository.save(appointment);
        if (sendEmail) {
            mailService.sendMail(patient.getUser().getEmail(), "Cita Médica: Confirmación", appointment);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(MESSAGE, "Cita agendada correctamente", APPOINTMENT, modelMapper.map(appointment, AppointmentResponse.class)));
    }

    @Override
    @Transactional
    public ResponseEntity<Map<String, Object>> updateAppointment(Long appointmentId, AppointmentRequest appointmentRequest) {
        var appointment = getAppointment(appointmentId);
        Long patientId = appointment.getPatient().getId();
        ownershipVerifyPassed(patientId);
        isTimeTaken(appointment.getMedic(), appointmentRequest);
        outOfTimeRangeValidation(appointment.getMedic().getId(), appointmentRequest.getDate(), appointmentRequest.getTime());
        modelMapper.map(appointmentRequest, appointment);
        appointmentRepository.save(appointment);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(MESSAGE, "Cita reagendada correctamente", APPOINTMENT, modelMapper.map(appointment, AppointmentResponse.class)));
    }

    @Override
    @Transactional
    public ResponseEntity<Map<String, Object>> cancelAppointment(Long appointmentId) throws MessagingException {
        var appointment = getAppointment(appointmentId);
        Long patientId = appointment.getPatient().getId();
        ownershipVerifyPassed(patientId);
        checkIfNotConfirmed(appointment);
        appointment.setStatus(Status.CANCELADA);
        appointmentRepository.save(appointment);
        var patient = appointment.getPatient();
        if (sendEmail) {
            mailService.sendMail(patient.getUser().getEmail(), "Cita médica: Su cita fue cancelada", appointment);
        }
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(MESSAGE, "Cita cancelada correctamente", APPOINTMENT, modelMapper.map(appointment, AppointmentResponse.class)));
    }

    @Override
    public ResponseEntity<Map<String, Object>> getAppointmentsByPatient(Long patientId) {
        getPatientFromRepository(patientId);
        var response = validateListAndGetResponse(getListOfAppointments(patientId));
        return ResponseEntity.ok(Map.of(MESSAGE, "Lista de citas médicas", APPOINTMENTS, response));
    }

    @Override
    public ResponseEntity<List<AppointmentListResponse>> getAppointmentsByMedic(Long medicId) {
        var appointments = appointmentRepository.findByMedicIdAndStatusOrderByDateAscTimeAsc(medicId, Status.CONFIRMADA);
        if(appointments.isEmpty()){
            throw new IllegalArgumentException("There are not appointments");
        }
        var response = appointments.stream()
                .map(a -> modelMapper.map(a, AppointmentListResponse.class))
                .toList();
        return ResponseEntity.ok(response);
    }

    private List<Appointment> getListOfAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    private List<AppointmentListResponse> validateListAndGetResponse(List<Appointment> appointments) {
        if (appointments.isEmpty()) {
            throw new AppointmentNotFoundException("El paciente no tiene citas médicas registradas");
        }
        return appointments.stream().map(a -> modelMapper.map(a, AppointmentListResponse.class)).toList();
    }

    private Medic getMedicFromRepository(Long id) {
        return medicRepository.findById(id).orElseThrow(() -> new MedicNotFoundException("Médico no encontrado"));
    }

    private Patient getPatientFromRepository(Long id) {
        return patientRepository.findById(id).orElseThrow(() -> new PatientNotFoundException("Paciente no encontrado"));
    }

    public Appointment getAppointment(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));
    }

    public void checkIfNotConfirmed(Appointment appointment) {
        if (appointment.getStatus().equals(Status.CANCELADA) || appointment.getStatus().equals(Status.COMPLETADA)) {
            throw new CancelledAppointmentException("No se puede modificar una cita " + appointment.getStatus().toString().toLowerCase());
        }
    }

    private void isTimeTaken(Medic medic, AppointmentRequest appointmentRequest) {
        var medicAppointments = medic.getAppointment();
        if (medicAppointments.isEmpty()) {
            return;
        }
        medicAppointments.stream()
                .filter(a -> a.getTime().equals(appointmentRequest.getTime())
                        && a.getDate().isEqual(appointmentRequest.getDate()))
                .findAny()
                .ifPresent(a -> {
                    throw new InvalidDataException("Ese horario ya está asignado");
                });
    }

    private void outOfTimeRangeValidation(Long medicId, LocalDate date, LocalTime time) {
        var list = scheduleRepository.findAvailableSchedules(medicId, date, time);
        if (list.isEmpty()) {
            throw new InvalidDataException("No hay disponibilidad médica para crear una cita en ese horario");
        }
    }

    private void ownershipVerifyPassed(Long patientId){
        securityOwnership.isSamePatientId(patientId);
    }
}