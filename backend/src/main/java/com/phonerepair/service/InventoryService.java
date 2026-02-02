package com.phonerepair.service;

import com.phonerepair.model.Part;
import com.phonerepair.model.Part.PartStatus;
import com.phonerepair.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final PartRepository partRepository;

    /**
     * Automatically update inventory status based on stock levels
     * Runs every hour
     */
    @Scheduled(fixedRate = 3600000) // Run every hour
    @Transactional
    public void updateInventoryStatus() {
        log.info("Running inventory status update...");
        
        List<Part> parts = partRepository.findAll();
        int updated = 0;
        
        for (Part part : parts) {
            PartStatus oldStatus = part.getStatus();
            part.updateStatus(); // This will trigger the @PreUpdate method
            
            if (oldStatus != part.getStatus()) {
                partRepository.save(part);
                updated++;
                log.info("Updated part {} status from {} to {}", 
                    part.getName(), oldStatus, part.getStatus());
            }
        }
        
        log.info("Inventory status update completed. {} parts updated.", updated);
    }

    /**
     * Check low stock items and log warnings
     */
    public List<Part> getLowStockItems() {
        List<Part> lowStockItems = partRepository.findByStatus(PartStatus.LOW_STOCK);
        if (!lowStockItems.isEmpty()) {
            log.warn("Low stock alert: {} items are running low", lowStockItems.size());
        }
        return lowStockItems;
    }

    /**
     * Check out of stock items
     */
    public List<Part> getOutOfStockItems() {
        return partRepository.findByStatus(PartStatus.OUT_OF_STOCK);
    }

    /**
     * Update stock for a part
     */
    @Transactional
    public void updateStock(Long partId, int quantity) {
        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new RuntimeException("Part not found with id: " + partId));
        
        part.setStock(part.getStock() + quantity);
        partRepository.save(part);
        
        log.info("Updated stock for part {}: new quantity = {}", part.getName(), part.getStock());
    }
}
