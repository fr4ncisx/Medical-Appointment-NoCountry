package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.MedicRequest;
import com.healthcare.domain.dto.request.MedicRequestUpdate;
import com.healthcare.domain.dto.request.UserRequest;
import com.healthcare.domain.dto.response.MedicResponse;
import com.healthcare.domain.dto.response.MedicUserResponse;
import com.healthcare.domain.exceptions.DuplicatedEntryEx;
import com.healthcare.domain.exceptions.MedicDeletionException;
import com.healthcare.domain.exceptions.MedicNotFoundException;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.Image;
import com.healthcare.domain.model.entity.Medic;
import com.healthcare.domain.model.entity.User;
import com.healthcare.domain.model.enums.Role;
import com.healthcare.domain.repository.AppointmentRepository;
import com.healthcare.domain.repository.ImageRepository;
import com.healthcare.domain.repository.MedicRepository;
import com.healthcare.domain.repository.UserRepository;
import com.healthcare.domain.service.interfaces.IMedicService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class MedicServiceImpl implements IMedicService {

    private final MedicRepository medicRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;

    @Cacheable(value = "medics", key = "#speciality + '-' + #gender + '-' + #state")
    @Override
    public ResponseEntity<Map<String, List<MedicResponse>>> getAllMedics(String speciality, String gender, String state) {
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
    public ResponseEntity<Map<String, MedicResponse>> getMedicById(Long id) {
        Medic medic = getMedic(id);
        MedicResponse dto = modelMapper.map(medic, MedicResponse.class);
        return ResponseEntity.ok(Map.of("medic", dto));
    }

    @CacheEvict(value = "medics", allEntries = true)
    @CachePut(value = "medic", key = "#medicRequest.documentId")
    @Override
    @Transactional
    public ResponseEntity<Map<String, Object>> createMedic(MedicRequest medicRequest) {
        UserRequest userRequest = medicRequest.getUser();
        if (medicRepository.existsByDocumentId(medicRequest.getDocumentId())) {
            throw new DuplicatedEntryEx("Médico ya registrado");
        }
        if(userRepository.existsByEmail(userRequest.getEmail())){
            throw new DuplicatedEntryEx("El correo ya esta asociado a una cuenta");
        }

        var imageRequest = medicRequest.getImage();
        imageRequest.setDate(LocalDate.now());
        Image image = modelMapper.map(imageRequest, Image.class);
        String userEncodedPassword = passwordEncoder.encode(userRequest.getPassword());
        User user = new User(userRequest, userEncodedPassword, Role.MEDICO);
        Medic medic = new Medic(medicRequest, user, image);

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
    public ResponseEntity<Map<String, String>> deleteMedic(Long id) {
        Medic medic = getMedic(id);

        if (appointmentRepository.existsByMedicId(id)) {
            throw new MedicDeletionException("No se puede eliminar el Médico porque tiene citas asociadas");
        }
        String publicId = cloudinaryService.convertUrlToPublicId(medic.getImage().getUrl());
        medicRepository.delete(medic);
        var response = cloudinaryService.deleteFromCloudinary(publicId);
        log.warn("Deleted image status: {}", response.getResult());
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
        var medic = getMedic(id);
        var image = Optional.ofNullable(medic.getImage());
        image.ifPresent(i -> {
            var imageRequest = medicRequest.getImage();
            imageRequest.setDate(LocalDate.now());
            modelMapper.map(imageRequest, image);
            imageRepository.save(i);
            medic.setImage(i);
        });
        modelMapper.map(medicRequest, medic);
        medicRepository.save(medic);
    }

    private Medic getMedic(Long id){
        return medicRepository.findById(id)
                .orElseThrow(() -> new MedicNotFoundException("No se encontró el médico"));
    }
}