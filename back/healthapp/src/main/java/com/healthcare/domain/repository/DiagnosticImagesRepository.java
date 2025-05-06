package com.healthcare.domain.repository;

import com.healthcare.domain.model.entity.DiagnosticImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosticImagesRepository extends JpaRepository<DiagnosticImages, Long> {
    List<DiagnosticImages> findByPatientId(Long patientId);
}
