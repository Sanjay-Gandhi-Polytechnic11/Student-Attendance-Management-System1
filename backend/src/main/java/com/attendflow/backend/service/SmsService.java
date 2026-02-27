package com.attendflow.backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SmsService {

    @Value("${twilio.account_sid}")
    private String accountSid;

    @Value("${twilio.auth_token}")
    private String authToken;

    @Value("${twilio.phone_number}")
    private String fromPhoneNumber;

    @PostConstruct
    public void init() {
        if (accountSid != null && !accountSid.equals("your_account_sid_here") && !accountSid.isEmpty()) {
            Twilio.init(accountSid, authToken);
            log.info("Twilio initialized with Account SID: {}", accountSid);
        } else {
            log.warn("Twilio credentials not found or not configured. SMS will be simulated.");
        }
    }

    public void sendSms(String to, String message) {
        // Enforce E.164 format if possible, or at least log the attempt
        log.info("Attempting to send SMS to: {} with message: {}", to, message);

        if (accountSid == null || accountSid.equals("your_account_sid_here") || accountSid.isEmpty()) {
            simulateSms(to, message);
            return;
        }

        try {
            // Ensure phone number starts with + for Twilio
            String formattedTo = to.startsWith("+") ? to : "+" + to;

            Message twilioMessage = Message.creator(
                    new PhoneNumber(formattedTo),
                    new PhoneNumber(fromPhoneNumber),
                    message).create();

            log.info("SMS Sent successfully. SID: {}", twilioMessage.getSid());
            System.out.println("--------------------------------------------------");
            System.out.println("GATEWAY: TWILIO PROTOCOL COMPLETED");
            System.out.println("TARGET : " + formattedTo);
            System.out.println("SID    : " + twilioMessage.getSid());
            System.out.println("STATUS : SUCCESS");
            System.out.println("--------------------------------------------------");
        } catch (Exception e) {
            log.error("Failed to send SMS via Twilio: {}", e.getMessage());
            simulateSms(to, message + " (FAILED REAL SEND: " + e.getMessage() + ")");
        }
    }

    private void simulateSms(String to, String message) {
        System.out.println("--------------------------------------------------");
        System.out.println("GATEWAY: SMS PROTOCOL INITIATED (SIMULATED)");
        System.out.println("TARGET : " + to);
        System.out.println("PAYLOAD: " + message);
        System.out.println("STATUS : LOGGED TO CONSOLE");
        System.out.println("--------------------------------------------------");
    }
}
