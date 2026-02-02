package com.phonerepair.dto;

import com.phonerepair.model.Part.PartStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartResponse {

    private Long id;
    private String name;
    private String description;
    private Integer stock;
    private BigDecimal price;
    private PartStatus status;
    private String category;
    private String compatibleDevices;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
