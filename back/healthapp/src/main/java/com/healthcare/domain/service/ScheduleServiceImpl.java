package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.ScheduleRequest;
import com.healthcare.domain.dto.response.ScheduleResponse;
import com.healthcare.domain.exceptions.InvalidDataException;
import com.healthcare.domain.exceptions.MedicNotFoundException;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.Medic;
import com.healthcare.domain.model.entity.Schedule;
import com.healthcare.domain.repository.MedicRepository;
import com.healthcare.domain.repository.ScheduleRepository;
import com.healthcare.domain.service.interfaces.IScheduleService;
import com.healthcare.domain.utils.Response;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements IScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final MedicRepository medicRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public ResponseEntity<?> createSchedule(Long medicId, ScheduleRequest scheduleRequest) {
        Medic medic = getMedic(medicId);
        var mediSchedule = medic.getSchedules();
        checkTakenSchedule(mediSchedule, scheduleRequest);
        Schedule newSchedule = new Schedule(scheduleRequest, medic);
        scheduleRepository.saveAndFlush(newSchedule);
        var response = modelMapper.map(newSchedule, ScheduleResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @Override
    public ResponseEntity<?> getAllSchedulesByMedicId(Long medicId) {
        Medic medic = getMedic(medicId);

        List<Schedule> schedules = medic.getSchedules();

        if (schedules.isEmpty()) {
            throw new NotFoundInDatabaseException("No se encontraron horarios para este médico");
        }

        List<ScheduleResponse> scheduleResponses = schedules.stream()
                .map(schedule -> modelMapper.map(schedule, ScheduleResponse.class))
                .toList();

        return ResponseEntity.ok(scheduleResponses);
    }

    @Override
    public ResponseEntity<?> getScheduleById(Long scheduleId) {
        Schedule schedule = getSchedule(scheduleId);

        ScheduleResponse scheduleResponse = modelMapper.map(schedule, ScheduleResponse.class);

        return ResponseEntity.ok(scheduleResponse);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateSchedule(Long scheduleId, ScheduleRequest scheduleRequest) {
        Schedule sch = getSchedule(scheduleId);
        checkTakenSchedule(sch, scheduleRequest);
        modelMapper.map(scheduleRequest, sch);
        scheduleRepository.save(sch);

        ScheduleResponse scheduleResponse = modelMapper.map(sch, ScheduleResponse.class);

        return ResponseEntity.ok(scheduleResponse);
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteSchedule(Long scheduleId) {
        Schedule schedule = getSchedule(scheduleId);
        scheduleRepository.delete(schedule);
        return ResponseEntity.ok(Response.create("message", "Horario eliminado con éxito"));
    }

    private Schedule getSchedule(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundInDatabaseException("Horario no encontrado"));
    }

    private Medic getMedic(Long id) {
        return medicRepository.findById(id)
                .orElseThrow(() -> new MedicNotFoundException("Médico no encontrado"));
    }

    private void validateTime(ScheduleRequest scheduleRequest) {
        LocalDate actualDate = LocalDate.now();
        if(scheduleRequest.getStartDate().isBefore(actualDate)){
            throw new InvalidDataException("No se pueden registrar horarios en tiempo pasado");
        }
        if (scheduleRequest.getStartDate().isAfter(scheduleRequest.getEndDate())) {
            throw new InvalidDataException("El horario de fin no puede ser menor al horario de inicio");
        }
        if (scheduleRequest.getStartTime() == scheduleRequest.getEndTime()) {
            throw new InvalidDataException("No pueden asignarse los mismos horarios de inicio y fin");
        }
        if (scheduleRequest.getEndTime().isBefore(scheduleRequest.getStartTime())) {
            throw new InvalidDataException("El horario de fin no puede ser menor al horario de inicio");
        }
    }

    private void checkTakenSchedule(List<Schedule> mediSchedule, ScheduleRequest scheduleRequest) {
        validateTime(scheduleRequest);
        for (Schedule sch : mediSchedule) {
            boolean isSameDay = sch.getStartDate().isEqual(scheduleRequest.getStartDate()) &&
                    sch.getEndDate().isEqual(scheduleRequest.getEndDate());
            if (isSameDay) {
                boolean timeIsTaken = scheduleRequest.getStartTime().isBefore(sch.getEndTime()) && scheduleRequest.getEndTime().isAfter(sch.getStartTime());
                if (timeIsTaken) {
                    throw new InvalidDataException("No se puede crear ese rango horario porque ya existe uno");
                }
            }

        }
    }


    // TODO: Faltaria validar que al editar el horario no se superponga con los del mismo día y médico
    private void checkTakenSchedule(Schedule sch, ScheduleRequest request) {
        var requestStartTime = request.getStartTime();
        var requestEndTime = request.getEndTime();
        validateTime(request);
        boolean sameDay = sch.getStartDate().isEqual(request.getStartDate()) && sch.getEndDate().isEqual(request.getEndDate());
        boolean sameTime = requestStartTime.isBefore(sch.getEndTime()) && requestEndTime.isAfter(sch.getStartTime());

        if (sameDay && sameTime) {
            throw new InvalidDataException("El horario no se puede editar ya que se superpone con otro");
        }
    }

}