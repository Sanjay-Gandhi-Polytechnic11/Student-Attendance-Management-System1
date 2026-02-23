package com.attendflow.backend.controller;

import com.attendflow.backend.model.User;
import com.attendflow.backend.repository.UserRepository;
import com.attendflow.backend.service.EmailService;
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
    private EmailService emailService;

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
        return ResponseEntity.ok(userRepository.save(user));
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
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok().body(java.util.Map.of("message", "Account deleted successfully"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
