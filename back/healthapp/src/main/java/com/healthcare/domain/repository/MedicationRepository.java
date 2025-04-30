package com.healthcare.domain.repository;

import com.healthcare.domain.model.entity.Medications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicationRepository extends JpaRepository<Medications, Long> {

}
