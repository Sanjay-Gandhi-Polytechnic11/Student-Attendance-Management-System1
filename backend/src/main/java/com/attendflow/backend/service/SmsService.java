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
        System.out.println("--------------------------------------------------");
        System.out.println("GATEWAY: SMS PROTOCOL INITIATED");
        System.out.println("TARGET : " + to);
        System.out.println("PAYLOAD: " + message);
        System.out.println("STATUS : SUCCESSFUL DELIVERY");
        System.out.println("--------------------------------------------------");
    }
}
