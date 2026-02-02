package com.phonerepair.dto;

import com.phonerepair.model.Booking.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {

    private Long id;
    private String customerName;
    private String email;
    private String phone;
    private String deviceType;
    private String serviceType;
    private String priceRange;
    private String description;
    private BookingStatus status;
    private LocalDateTime estimatedCompletion;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
