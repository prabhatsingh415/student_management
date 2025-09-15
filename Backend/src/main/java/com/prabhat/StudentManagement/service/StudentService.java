package com.prabhat.StudentManagement.service;

import com.prabhat.StudentManagement.entity.Course;
import com.prabhat.StudentManagement.entity.Student;


import java.util.List;

public interface StudentService {
    void addStudent(Student student);
    List<Student> getAllStudents();
    void checkToken(String token);

    boolean updateCourse(long studentId, Course course);

    void deleteStudent(long studentId);
}
