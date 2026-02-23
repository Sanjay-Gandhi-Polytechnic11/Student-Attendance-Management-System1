package com.attendflow.backend.config;

import com.attendflow.backend.model.Student;
import com.attendflow.backend.model.User;
import com.attendflow.backend.repository.StudentRepository;
import com.attendflow.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(StudentRepository studentRepository, UserRepository userRepository) {
        return args -> {
            System.out.println("--- Starting Database Initialization ---");

            // Initial Students
            if (studentRepository.count() == 0) {
                studentRepository.saveAll(Arrays.asList(
                        new Student(null, "Alice Johnson", "CS001", "Grade 10", "Present", "08:45 AM"),
                        new Student(null, "Bob Smith", "CS002", "Grade 10", "Present", "08:50 AM"),
                        new Student(null, "Charlie Brown", "CS003", "Grade 10", "Late", "09:15 AM"),
                        new Student(null, "Diana Prince", "CS004", "Grade 10", "Absent", "-"),
                        new Student(null, "Ethan Hunt", "CS005", "Grade 10", "Present", "08:40 AM")));
                System.out.println("Inserted 5 default students.");
            } else {
                System.out.println("Students already exist. Skipping student initialization.");
            }

            // Default Admin, Teacher, and HOD
            if (userRepository.count() == 0) {
                userRepository.save(new User(null, "admin", "admin123", "admin@sgpb.edu.in", "ADMIN"));
                userRepository.save(new User(null, "teacher", "teacher123", "teacher@sgpb.edu.in", "TEACHER"));
                userRepository.save(new User(null, "hod", "hod123", "hod@sgpb.edu.in", "HOD"));
                System.out.println("Inserted default administrative personnel.");
            } else {
                System.out.println("Users already exist. Skipping user initialization.");
            }

            System.out.println("--- Database Initialization Complete ---");
        };
    }
}
