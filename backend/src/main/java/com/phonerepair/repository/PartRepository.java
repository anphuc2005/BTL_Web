package com.phonerepair.repository;

import com.phonerepair.model.Part;
import com.phonerepair.model.Part.PartStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {
    
    List<Part> findByStatus(PartStatus status);
    
    List<Part> findByNameContainingIgnoreCase(String name);
    
    List<Part> findByCategory(String category);
}
