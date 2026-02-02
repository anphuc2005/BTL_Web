package com.phonerepair.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "parts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Part {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Integer stock = 0;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PartStatus status = PartStatus.AVAILABLE;

    private String category;

    private String compatibleDevices;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum PartStatus {
        AVAILABLE,
        LOW_STOCK,
        OUT_OF_STOCK
    }

    // Auto-update status based on stock
    @PreUpdate
    @PrePersist
    public void updateStatus() {
        if (stock == 0) {
            this.status = PartStatus.OUT_OF_STOCK;
        } else if (stock <= 5) {
            this.status = PartStatus.LOW_STOCK;
        } else {
            this.status = PartStatus.AVAILABLE;
        }
    }
}
