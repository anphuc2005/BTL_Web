package com.phonerepair.service;

import com.phonerepair.dto.BookingRequest;
import com.phonerepair.dto.BookingResponse;
import com.phonerepair.model.Booking;
import com.phonerepair.model.Booking.BookingStatus;
import com.phonerepair.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        Booking booking = new Booking();
        booking.setCustomerName(request.getCustomerName());
        booking.setEmail(request.getEmail());
        booking.setPhone(request.getPhone());
        booking.setDeviceType(request.getDeviceType());
        booking.setServiceType(request.getServiceType());
        booking.setPriceRange(request.getPriceRange());
        booking.setDescription(request.getDescription());
        booking.setStatus(BookingStatus.PENDING);
        booking.setEstimatedCompletion(LocalDateTime.now().plusDays(3));

        Booking savedBooking = bookingRepository.save(booking);

        // Send notification
        notificationService.sendBookingConfirmation(savedBooking);

        return mapToResponse(savedBooking);
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        return mapToResponse(booking);
    }

    public List<BookingResponse> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingResponse updateBookingStatus(Long id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        
        booking.setStatus(status);
        
        if (status == BookingStatus.COMPLETED) {
            booking.setEstimatedCompletion(LocalDateTime.now());
        }

        Booking updatedBooking = bookingRepository.save(booking);

        // Send status update notification
        notificationService.sendStatusUpdate(updatedBooking);

        return mapToResponse(updatedBooking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        // Send cancellation notification
        notificationService.sendCancellationNotification(booking);
    }

    public long countByStatus(BookingStatus status) {
        return bookingRepository.countByStatus(status);
    }

    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setCustomerName(booking.getCustomerName());
        response.setEmail(booking.getEmail());
        response.setPhone(booking.getPhone());
        response.setDeviceType(booking.getDeviceType());
        response.setServiceType(booking.getServiceType());
        response.setPriceRange(booking.getPriceRange());
        response.setDescription(booking.getDescription());
        response.setStatus(booking.getStatus());
        response.setEstimatedCompletion(booking.getEstimatedCompletion());
        response.setNotes(booking.getNotes());
        response.setCreatedAt(booking.getCreatedAt());
        response.setUpdatedAt(booking.getUpdatedAt());
        return response;
    }
}
