package com.phonerepair.controller;

import com.phonerepair.model.Booking.BookingStatus;
import com.phonerepair.service.BookingService;
import com.phonerepair.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
@Tag(name = "Admin", description = "Admin dashboard APIs")
public class AdminController {

    private final BookingService bookingService;
    private final InventoryService inventoryService;

    @GetMapping("/dashboard/stats")
    @Operation(summary = "Get dashboard statistics")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Booking statistics
        stats.put("pendingBookings", bookingService.countByStatus(BookingStatus.PENDING));
        stats.put("confirmedBookings", bookingService.countByStatus(BookingStatus.CONFIRMED));
        stats.put("inProgressBookings", bookingService.countByStatus(BookingStatus.IN_PROGRESS));
        stats.put("completedBookings", bookingService.countByStatus(BookingStatus.COMPLETED));
        stats.put("cancelledBookings", bookingService.countByStatus(BookingStatus.CANCELLED));
        
        // Inventory statistics
        stats.put("lowStockItems", inventoryService.getLowStockItems().size());
        stats.put("outOfStockItems", inventoryService.getOutOfStockItems().size());
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/inventory/low-stock")
    @Operation(summary = "Get low stock items")
    public ResponseEntity<?> getLowStockItems() {
        return ResponseEntity.ok(inventoryService.getLowStockItems());
    }

    @GetMapping("/inventory/out-of-stock")
    @Operation(summary = "Get out of stock items")
    public ResponseEntity<?> getOutOfStockItems() {
        return ResponseEntity.ok(inventoryService.getOutOfStockItems());
    }

    @PostMapping("/inventory/{partId}/update-stock")
    @Operation(summary = "Update part stock")
    public ResponseEntity<Void> updateStock(
            @PathVariable Long partId,
            @RequestParam int quantity) {
        inventoryService.updateStock(partId, quantity);
        return ResponseEntity.ok().build();
    }
}
