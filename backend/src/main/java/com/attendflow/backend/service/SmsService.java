package com.attendflow.backend.service;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SmsService {

    public void sendSms(String to, String message) {
        // In a real application, you would integrate with an SMS gateway like Twilio,
        // Vonage, etc.
        // For now, we will simulate the SMS sending by logging it.
        log.info("Sending SMS to: {}", to);
        log.info("Message: {}", message);

        // Simulate a delay
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("SMS sent successfully to " + to + ": " + message);
    }
}
