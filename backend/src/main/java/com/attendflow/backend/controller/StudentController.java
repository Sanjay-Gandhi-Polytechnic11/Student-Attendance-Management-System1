package com.attendflow.backend.controller;

import com.attendflow.backend.model.Student;
import com.attendflow.backend.repository.StudentRepository;
import com.attendflow.backend.service.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SmsService smsService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/search")
    public List<Student> searchStudents(@RequestParam String query) {
        return studentRepository.findByNameContainingIgnoreCaseOrRollContainingIgnoreCase(query, query);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Student> updateStatus(@PathVariable @io.micrometer.common.lang.NonNull Long id,
            @RequestBody Student statusUpdate) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setStatus(statusUpdate.getStatus());
                    student.setTime(statusUpdate.getTime());
                    return ResponseEntity.ok(studentRepository.save(student));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable @io.micrometer.common.lang.NonNull Long id,
            @RequestBody Student studentDetails) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setName(studentDetails.getName());
                    String oldPhone = student.getParentPhoneNumber();
                    String newPhone = studentDetails.getParentPhoneNumber();

                    student.setRoll(studentDetails.getRoll());
                    student.setStudentClass(studentDetails.getStudentClass());
                    student.setParentPhoneNumber(newPhone);

                    if (studentDetails.getStatus() != null)
                        student.setStatus(studentDetails.getStatus());
                    if (studentDetails.getTime() != null)
                        student.setTime(studentDetails.getTime());

                    Student updated = studentRepository.save(student);

                    // Send notification if phone number was changed or newly added
                    if (newPhone != null && !newPhone.isEmpty() && !newPhone.equals(oldPhone)) {
                        String msg = String.format(
                                "SGPB Alert: Mobile Notification Node updated for %s. You will now receive attendance alerts here.",
                                student.getName());
                        smsService.sendSms(newPhone, msg);
                    }

                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/send-sms")
    public ResponseEntity<String> sendSmsToParents(@RequestBody List<Student> students) {
        for (Student student : students) {
            String phoneNumber = student.getParentPhoneNumber();
            if (phoneNumber != null && !phoneNumber.isEmpty()) {
                String status = student.getStatus() != null ? student.getStatus() : "Unknown";
                String message = String.format("Dear Parent, your child %s (Roll: %s) is %s today.",
                        student.getName(), student.getRoll(), status);
                smsService.sendSms(phoneNumber, message);
            }
        }
        return ResponseEntity.ok("SMS notifications sent successfully");
    }

    @PostMapping
    public @io.micrometer.common.lang.NonNull Student addStudent(
            @RequestBody @io.micrometer.common.lang.NonNull Student student) {
        return studentRepository.save(student);
    }
}
