package com.prabhat.StudentManagement.controller;

import com.prabhat.StudentManagement.entity.Course;
import com.prabhat.StudentManagement.entity.Student;
import com.prabhat.StudentManagement.service.StudentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> addStudent(@RequestParam("token") String token, @RequestBody Student student){
        service.checkToken(token);  // token verification

        service.addStudent(student);
        return ResponseEntity.ok(
                Map.of(
                        "status", "success",
                        "message", "Student added successfully"
                )
        );
    }

    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents(@RequestParam("token") String token){
        service.checkToken(token);

        List<Student> students = service.getAllStudents();
        return ResponseEntity.ok(
                Map.of(
                        "status", "success",
                        "data", students
                )
        );
    }
    @PutMapping("/{studentId}/course")
    public ResponseEntity<Map<String, String>> updateCourse(
            @RequestParam("token") String token,
            @PathVariable long studentId,
            @RequestBody Course course) {

        service.checkToken(token);

        boolean updated = service.updateCourse(studentId, course); // ab ye boolean return karega

        if (updated) {
            return ResponseEntity.ok(
                    Map.of(
                            "status", "success",
                            "message", "Student course updated successfully"
                    )
            );
        } else {
            return ResponseEntity.ok(
                    Map.of(
                            "status", "success",
                            "message", "No update required, same course already assigned"
                    )
            );
        }
    }


    @DeleteMapping("/{studentId}/student")
    public ResponseEntity<Map<String, String>> deleteStudent(
            @RequestParam("token") String token,
            @PathVariable long studentId) {

        service.checkToken(token);

        service.deleteStudent(studentId);
        return ResponseEntity.ok(
                Map.of(
                        "status", "success",
                        "message", "Student deleted successfully"
                )
        );
    }
}

