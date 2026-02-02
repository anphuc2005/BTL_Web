package com.phonerepair.controller;

import com.phonerepair.dto.BookingRequest;
import com.phonerepair.dto.BookingResponse;
import com.phonerepair.model.Booking.BookingStatus;
import com.phonerepair.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
@Tag(name = "Booking", description = "Booking management APIs")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    @Operation(summary = "Create a new booking")
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        BookingResponse response = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get all bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookingResponse> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get booking by ID")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long id) {
        BookingResponse booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get bookings by status")
    public ResponseEntity<List<BookingResponse>> getBookingsByStatus(@PathVariable BookingStatus status) {
        List<BookingResponse> bookings = bookingService.getBookingsByStatus(status);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update booking status")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        BookingStatus status = BookingStatus.valueOf(request.get("status"));
        BookingResponse booking = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancel booking")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count/{status}")
    @Operation(summary = "Count bookings by status")
    public ResponseEntity<Long> countByStatus(@PathVariable BookingStatus status) {
        long count = bookingService.countByStatus(status);
        return ResponseEntity.ok(count);
    }
}
