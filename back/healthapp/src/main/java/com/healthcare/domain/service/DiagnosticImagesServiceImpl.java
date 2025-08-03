package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.DiagnosticRequest;
import com.healthcare.domain.dto.response.DiagnosticResponse;
import com.healthcare.domain.exceptions.NotFoundInDatabaseException;
import com.healthcare.domain.model.entity.DiagnosticImages;
import com.healthcare.domain.model.entity.Patient;
import com.healthcare.domain.repository.DiagnosticImagesRepository;
import com.healthcare.domain.repository.PatientRepository;
import com.healthcare.domain.service.interfaces.IDiagnosticImagesService;
import com.healthcare.domain.utils.Response;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class DiagnosticImagesServiceImpl implements IDiagnosticImagesService {

    private final DiagnosticImagesRepository diagnosticImagesRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;
    private final CacheManager cacheManager;

    @Cacheable(
            value = "diagnostic-cache",
            key = "#id != null ? 'id:' + #id : 'patientId:' + #patientId"
    )
    @Override
    public ResponseEntity<List<DiagnosticResponse>> getDiagnostics(Long id, Long patientId) {
        var diagnostic = getDiagnostic(id, patientId);
        var response = diagnostic.stream()
                .map(d -> convertValue(d, DiagnosticResponse.class))
                .toList();
        return ResponseEntity.ok(response);
    }


    @CacheEvict(value = "diagnostic-cache", key = "'patientId:' + #patientId")
    @Override
    public ResponseEntity<DiagnosticResponse> create(Long patientId, DiagnosticRequest diagnosticRequest) {
        Patient patient = findPatientById(patientId);
        DiagnosticImages diagnostic = convertValue(diagnosticRequest, DiagnosticImages.class);

        diagnostic.getImages().forEach(image -> {
            image.setDate(LocalDateTime.now());
            image.setDiagnosticImages(diagnostic);
        });

        diagnostic.setPatient(patient);
        var savedDiagnostic = diagnosticImagesRepository.save(diagnostic);

        DiagnosticResponse response = convertValue(savedDiagnostic, DiagnosticResponse.class);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<DiagnosticResponse> update(Long id, DiagnosticRequest diagnosticRequest) {
        var diagnostic = getOneDiagnostic(id).getFirst();
        var patient = diagnostic.getPatient();

        modelMapper.map(diagnosticRequest, diagnostic);

        diagnostic.getImages().forEach(image -> {
            image.setDate(LocalDateTime.now());
            image.setDiagnosticImages(diagnostic);
        });

        diagnostic.setPatient(patient);

        var savedDiagnostic = diagnosticImagesRepository.save(diagnostic);

        deleteCache(savedDiagnostic);

        return ResponseEntity.ok(convertValue(savedDiagnostic, DiagnosticResponse.class));
    }

    @Override
    public ResponseEntity<Map<String, String>> delete(Long id) {
        var diagnostic = getOneDiagnostic(id).stream()
                .findFirst()
                .orElseThrow(() -> new NotFoundInDatabaseException("No se encontró el diágnostico"));
        diagnosticImagesRepository.delete(diagnostic);
        deleteCache(diagnostic);
        return ResponseEntity.ok(Response.create("Eliminado exitosamente"));
    }

    private List<DiagnosticImages> getDiagnostic(Long id, Long patientId) {
        if (id == null && patientId == null)
            throw new IllegalArgumentException("Se espera al menos un id o patientId");
        if (id != null && patientId != null)
            throw new IllegalArgumentException("No se pueden enviar dos parametros solo uno es requerido");
        if (patientId != null)
            return getList(patientId);
        return getOneDiagnostic(id);
    }

    private Patient findPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new NotFoundInDatabaseException("No se encontró el paciente"));
    }

    private List<DiagnosticImages> getList(Long patientId) {
        return Optional.of(diagnosticImagesRepository.findByPatientId(patientId))
                .filter(list -> !list.isEmpty())
                .map(list -> list.stream()
                        .toList())
                .orElseThrow(() -> new NotFoundInDatabaseException("No se encontraron registros de diágnosticos"));
    }

    private List<DiagnosticImages> getOneDiagnostic(Long id) {
        var diagnostic = diagnosticImagesRepository.findById(id)
                .orElseThrow(() -> new NotFoundInDatabaseException("No se encontró el diágnostico"));
        return List.of(diagnostic);
    }

    private void deleteCache(DiagnosticImages d) {
        Optional.ofNullable(cacheManager.getCache("diagnostic-cache"))
                .ifPresent(c -> {
                    c.evict("id:" + d.getId());
                    c.evict("patientId:" + d.getPatient().getId());
                });
    }

    private <T, C> C convertValue(T source, Class<C> requiredClass) {
        return modelMapper.map(source, requiredClass);
    }
}