package com.attendflow.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class SmsService {

    @Value("${fast2sms.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Sends an SMS to a single phone number via the Fast2SMS API.
     *
     * @param phoneNumber The recipient's phone number (10-digit Indian mobile
     *                    number).
     * @param message     The message body to send.
     * 
     * @return A response string from the Fast2SMS API.
     */
    public String sendSms(String phoneNumber, String message) {
        String trimmedApiKey = apiKey != null ? apiKey.trim() : "";
        try {
            // Clean the phone number — remove +91 or leading 91 prefix if present
            String cleanPhone = phoneNumber.replaceAll("[^0-9]", "");
            if (cleanPhone.startsWith("91") && cleanPhone.length() == 12) {
                cleanPhone = cleanPhone.substring(2);
            }

            // Validate it's a 10-digit number
            if (cleanPhone.length() != 10) {
                throw new RuntimeException("Number must be 10 digits, got: " + cleanPhone);
            }

            // URL-encode the message so special characters don't break the URL
            String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8);

            // Fast2SMS Quick SMS route — works on free accounts
            String url = "https://www.fast2sms.com/dev/bulkV2"
                    + "?authorization=" + trimmedApiKey
                    + "&route=q"
                    + "&message=" + encodedMessage
                    + "&flash=0"
                    + "&numbers=" + cleanPhone;

            System.out.println("Calling Fast2SMS for: " + cleanPhone);
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Fast2SMS Response: " + response);

            // Check if response indicates success
            if (response != null && (response.contains("\"return\":true") || response.contains("\"return\": true"))) {
                return response;
            } else {
                String errorMsg = response != null ? response : "No response from gateway";
                throw new RuntimeException("Gateway rejected: " + errorMsg);
            }

        } catch (Exception e) {
            System.err.println("SMS Error: " + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}
