package com.attendflow.backend.controller;

import com.attendflow.backend.model.User;
import com.attendflow.backend.model.Student;
import com.attendflow.backend.repository.UserRepository;
import com.attendflow.backend.repository.StudentRepository;
import com.attendflow.backend.service.EmailService;
import com.attendflow.backend.service.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken");
        }
        User savedUser = userRepository.save(user);

        // If it's a student, send a welcome SMS and create a student record
        if ("STUDENT".equals(user.getRole())) {
            // Create student entry in the registry
            Student student = new Student();
            student.setName(user.getUsername());
            student.setRoll(user.getRollNumber());
            student.setParentPhoneNumber(user.getPhoneNumber());
            student.setStatus("Unknown");
            student.setTime("-");
            studentRepository.save(student);

            if (user.getPhoneNumber() != null && !user.getPhoneNumber().isEmpty()) {
                String message = String.format(
                        "Welcome to SGPB Portal. %s is now registered for attendance tracking. Registry ID: %s",
                        user.getUsername(), user.getRollNumber());
                smsService.sendSms(user.getPhoneNumber(), message);
            }
        }

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody java.util.Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            try {
                String subject = "Access Key Recovery - Sanjay Gandhi Polytechnic";
                String body = "Dear " + user.getUsername() + ",\n\n" +
                        "A request has been initiated to recover your access key for the AttendanceFlow Portal.\n\n" +
                        "Your Access Key is: " + user.getPassword() + "\n\n" +
                        "If you did not initiate this request, please contact the IT department immediately.\n\n" +
                        "Regards,\n" +
                        "SGPB Admin Core";

                emailService.sendEmail(email, subject, body);
                return ResponseEntity.ok().body(java.util.Map.of("message", "Reset link sent to " + email));
            } catch (Exception e) {
                return ResponseEntity.internalServerError().body("Failed to send email: " + e.getMessage());
            }
        }
        return ResponseEntity.status(404).body("Error: Identity not found in institutional registry.");

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }

        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User userToRemove = userOpt.get();
            userRepository.delete(userToRemove);
            return ResponseEntity.ok().body(java.util.Map.of("message", "Account deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}
