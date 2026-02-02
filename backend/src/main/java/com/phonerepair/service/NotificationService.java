package com.phonerepair.service;

import com.phonerepair.model.Booking;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender mailSender;

    @Value("${app.notification.email.from}")
    private String fromEmail;

    @Async
    public void sendBookingConfirmation(Booking booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(booking.getEmail());
            message.setSubject("Xác nhận đặt lịch sửa chữa - PhoneRepair");
            message.setText(String.format(
                "Xin chào %s,\n\n" +
                "Chúng tôi đã nhận được yêu cầu đặt lịch sửa chữa của bạn.\n\n" +
                "Thông tin đơn hàng:\n" +
                "- Mã đơn: #%d\n" +
                "- Thiết bị: %s\n" +
                "- Dịch vụ: %s\n" +
                "- Trạng thái: %s\n" +
                "- Dự kiến hoàn thành: %s\n\n" +
                "Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.\n\n" +
                "Trân trọng,\n" +
                "PhoneRepair Team",
                booking.getCustomerName(),
                booking.getId(),
                booking.getDeviceType(),
                booking.getServiceType(),
                booking.getStatus(),
                booking.getEstimatedCompletion()
            ));
            
            mailSender.send(message);
            log.info("Booking confirmation email sent to: {}", booking.getEmail());
        } catch (Exception e) {
            log.error("Failed to send booking confirmation email: {}", e.getMessage());
        }
    }

    @Async
    public void sendStatusUpdate(Booking booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(booking.getEmail());
            message.setSubject("Cập nhật trạng thái đơn hàng #" + booking.getId());
            message.setText(String.format(
                "Xin chào %s,\n\n" +
                "Đơn hàng #%d của bạn đã được cập nhật.\n\n" +
                "Trạng thái mới: %s\n" +
                "Ghi chú: %s\n\n" +
                "Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi.\n\n" +
                "Trân trọng,\n" +
                "PhoneRepair Team",
                booking.getCustomerName(),
                booking.getId(),
                booking.getStatus(),
                booking.getNotes() != null ? booking.getNotes() : "Không có ghi chú"
            ));
            
            mailSender.send(message);
            log.info("Status update email sent to: {}", booking.getEmail());
        } catch (Exception e) {
            log.error("Failed to send status update email: {}", e.getMessage());
        }
    }

    @Async
    public void sendCancellationNotification(Booking booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(booking.getEmail());
            message.setSubject("Hủy đơn hàng #" + booking.getId());
            message.setText(String.format(
                "Xin chào %s,\n\n" +
                "Đơn hàng #%d của bạn đã được hủy.\n\n" +
                "Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.\n\n" +
                "Trân trọng,\n" +
                "PhoneRepair Team",
                booking.getCustomerName(),
                booking.getId()
            ));
            
            mailSender.send(message);
            log.info("Cancellation email sent to: {}", booking.getEmail());
        } catch (Exception e) {
            log.error("Failed to send cancellation email: {}", e.getMessage());
        }
    }

    // SMS notification would be implemented here using a third-party service
    @Async
    public void sendSmsNotification(String phoneNumber, String message) {
        log.info("SMS would be sent to {}: {}", phoneNumber, message);
        // Implement SMS service integration (Twilio, AWS SNS, etc.)
    }
}
