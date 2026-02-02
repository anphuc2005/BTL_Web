package com.phonerepair.repository;

import com.phonerepair.model.Booking;
import com.phonerepair.model.Booking.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByStatus(BookingStatus status);
    
    List<Booking> findByEmail(String email);
    
    List<Booking> findByPhone(String phone);
    
    long countByStatus(BookingStatus status);
}
