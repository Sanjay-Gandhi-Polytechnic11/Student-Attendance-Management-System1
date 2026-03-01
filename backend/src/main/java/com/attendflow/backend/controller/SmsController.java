package com.attendflow.backend.controller;

import com.attendflow.backend.model.Student;
import com.attendflow.backend.service.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/api/sms")
@CrossOrigin(origins = "*")
public class SmsController {

    @Autowired
    private SmsService smsService;

    /**
     * Sends an SMS to a SINGLE student's parent.
     * POST /api/sms/send-individual
     * Body: { "name": "...", "status": "...", "parentPhoneNumber": "..." }
     */
    @PostMapping("/send-individual")
    public ResponseEntity<Map<String, Object>> sendIndividualSms(@RequestBody Student student) {
        Map<String, Object> result = new HashMap<>();

        String phone = student.getParentPhoneNumber();
        if (phone == null || phone.isBlank() || phone.equalsIgnoreCase("UNLINKED")) {
            result.put("success", false);
            result.put("message", "No parent phone number found for " + student.getName());
            return ResponseEntity.badRequest().body(result);
        }

        String message = buildAttendanceMessage(student.getName(), student.getStatus());

        try {
            smsService.sendSms(phone, message);
            result.put("success", true);
            result.put("message", "SMS Sent Successfully To The Recipient");
            result.put("sentTo", phone);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Failed to send SMS: " + e.getMessage());
            return ResponseEntity.internalServerError().body(result);
        }
    }

    /**
     * Sends SMS to ALL absent students' parents in a batch.
     * POST /api/sms/send-bulk
     * Body: [ { student1 }, { student2 }, ... ]
     */
    @PostMapping("/send-bulk")
    public ResponseEntity<Map<String, Object>> sendBulkSms(@RequestBody List<Student> students) {
        Map<String, Object> result = new HashMap<>();
        List<String> successList = new ArrayList<>();
        List<String> failedList = new ArrayList<>();

        // Only send SMS to absent students with a valid phone number
        List<Student> absentStudents = students.stream()
                .filter(s -> "Absent".equalsIgnoreCase(s.getStatus()))
                .filter(s -> s.getParentPhoneNumber() != null
                        && !s.getParentPhoneNumber().isBlank()
                        && !s.getParentPhoneNumber().equalsIgnoreCase("UNLINKED"))
                .toList();

        if (absentStudents.isEmpty()) {
            result.put("success", false);
            result.put("message", "No absent students with valid parent phone numbers found.");
            return ResponseEntity.ok(result);
        }

        for (Student student : absentStudents) {
            try {
                String message = buildAttendanceMessage(student.getName(), student.getStatus());
                smsService.sendSms(student.getParentPhoneNumber(), message);
                successList.add(student.getName() + " → " + student.getParentPhoneNumber());
            } catch (Exception e) {
                failedList.add(student.getName() + " (Error: " + e.getMessage() + ")");
            }
        }

        result.put("success", true);
        result.put("totalSent", successList.size());
        result.put("totalFailed", failedList.size());
        result.put("sentTo", successList);
        result.put("failed", failedList);
        result.put("message", "Bulk SMS completed: " + successList.size() + " sent, " + failedList.size() + " failed.");
        return ResponseEntity.ok(result);
    }

    /**
     * Builds the attendance notification message.
     */
    private String buildAttendanceMessage(String studentName, String status) {
        return "Dear Parent, your ward " + studentName
                + " is marked as " + status
                + " today. For queries, contact the institution. - Sanjay Gandhi Polytechnic";
    }
}
