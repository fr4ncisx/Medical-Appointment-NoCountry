package com.healthcare.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.domain.model.entity.LabResults;

@Repository
public interface LabResultsRepository extends JpaRepository<LabResults, Long>{

}
