package com.attendflow.backend.controller;

import com.attendflow.backend.model.Student;
import com.attendflow.backend.repository.StudentRepository;
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

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/search")
    public List<Student> searchStudents(@RequestParam String query) {
        return studentRepository.findByNameContainingIgnoreCaseOrRollContainingIgnoreCase(query, query);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Student> updateStatus(@PathVariable Long id, @RequestBody Student statusUpdate) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setStatus(statusUpdate.getStatus());
                    student.setTime(statusUpdate.getTime());
                    return ResponseEntity.ok(studentRepository.save(student));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setName(studentDetails.getName());
                    student.setRoll(studentDetails.getRoll());
                    student.setStudentClass(studentDetails.getStudentClass());
                    if (studentDetails.getStatus() != null)
                        student.setStatus(studentDetails.getStatus());
                    if (studentDetails.getTime() != null)
                        student.setTime(studentDetails.getTime());
                    return ResponseEntity.ok(studentRepository.save(student));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
}
