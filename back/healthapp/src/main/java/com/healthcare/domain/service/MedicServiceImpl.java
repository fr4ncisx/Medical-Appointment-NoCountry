package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.MedicRequest;
import com.healthcare.domain.dto.request.MedicRequestUpdate;
import com.healthcare.domain.dto.response.MedicResponse;
import com.healthcare.domain.dto.response.MedicUserResponse;
import com.healthcare.domain.exceptions.DuplicatedEntryEx;
import com.healthcare.domain.exceptions.MedicDeletionException;
import com.healthcare.domain.exceptions.MedicNotFoundException;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.Medic;
import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.AppointmentRepository;
import com.healthcare.domain.repository.MedicRepository;
import com.healthcare.domain.repository.UserRepository;
import com.healthcare.domain.service.interfaces.IMedicService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MedicServiceImpl implements IMedicService {

    private final MedicRepository medicRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Cacheable(value = "medics", key = "#speciality + '-' + #gender + '-' + #state")
    @Override
    public ResponseEntity<?> getAllMedics(String speciality, String gender, String state) {
        List<Medic> medics = medicRepository.findAll();

        if (speciality != null) {
            medics = medics.stream()
                    .filter(medic -> medic.getSpeciality().name().equalsIgnoreCase(speciality))
                    .toList();
        }
        if (gender != null) {
            medics = medics.stream()
                    .filter(medic -> medic.getGender().name().equalsIgnoreCase(gender))
                    .toList();
        }
        if (state != null) {
            medics = medics.stream()
                    .filter(medic -> medic.getState().equalsIgnoreCase(state))
                    .toList();
        }

        List<MedicResponse> medicDTOS = medics.stream()
                .map(medicEntity -> modelMapper.map(medicEntity, MedicResponse.class))
                .toList();

        if (medicDTOS.isEmpty()) {
            throw new NotFoundInDatabaseException("Médicos no encontrados");
        }

        return ResponseEntity.ok(Map.of("medics", medicDTOS));
    }

    @Cacheable(value="medic", key= "#id")
    @Override
    public ResponseEntity<?> getMedicById(Long id) {
        Medic medic = medicRepository.findById(id)
                .orElseThrow(() -> new MedicNotFoundException("Médico no encontrado"));
        MedicResponse dto = modelMapper.map(medic, MedicResponse.class);
        return ResponseEntity.ok(Map.of("medic", dto));
    }

    @CacheEvict(value = "medics", allEntries = true)
    @CachePut(value = "medic", key = "#medicRequest.documentId")
    @Override
    @Transactional
    public ResponseEntity<?> createMedic(MedicRequest medicRequest) {
        var userRequest = medicRequest.getUser();
        if (medicRepository.existsByDocumentId(medicRequest.getDocumentId())) {
            throw new DuplicatedEntryEx("Médico ya registrado");
        }
        if(userRepository.existsByEmail(userRequest.getEmail())){
            throw new DuplicatedEntryEx("El correo ya esta asociado a una cuenta");
        }

        var userEncodedPassword = passwordEncoder.encode(userRequest.getPassword());
        User user = new User(userRequest, userEncodedPassword, Role.MEDICO);
        Medic medic = new Medic(medicRequest, user);

        medicRepository.save(medic);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Médico creado con éxito",
                "medic", modelMapper.map(medic, MedicUserResponse.class)));
    }

    @Caching(evict = {
            @CacheEvict(value = "medic", key = "#id"),
            @CacheEvict(value = "medics", allEntries = true)
    })
    @Override
    @Transactional
    public ResponseEntity<?> deleteMedic(Long id) {
        Medic medic = medicRepository.findById(id)
                .orElseThrow(() -> new MedicNotFoundException("Médico no encontrado"));

        if (appointmentRepository.existsByMedicId(id)) {
            throw new MedicDeletionException("No se puede eliminar el Médico porque tiene citas asociadas");
        }

        medicRepository.delete(medic);
        return ResponseEntity.ok(Map.of("message", "Médico eliminado con éxito"));
    }

    @Caching(evict = {
            @CacheEvict(value = "medic", key = "#id"),
            @CacheEvict(value = "medics", allEntries = true)
    })
    @CachePut(value = "medic", key = "#id")
    @Transactional
    @Override
    public void edit(Long id, MedicRequestUpdate medicRequest) {
        var medic = medicRepository.findById(id)
                .orElseThrow(() -> new NotFoundInDatabaseException("No se encontró el médico"));
        modelMapper.map(medicRequest, medic);
        medicRepository.save(medic);
    }
}