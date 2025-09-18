package com.prabhat.StudentManagement.repository;

import com.prabhat.StudentManagement.entity.Course;
import com.prabhat.StudentManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findById(long studentId);

    int countByCourse(Course oldCourse);

    Student findByEmail(String email);
}
