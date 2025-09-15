package com.prabhat.StudentManagement.service;

import com.prabhat.StudentManagement.controller.AuthController;
import com.prabhat.StudentManagement.entity.Course;
import com.prabhat.StudentManagement.entity.Student;
import com.prabhat.StudentManagement.exceptions.StudentNotFoundException;
import com.prabhat.StudentManagement.repository.CourseRepository;
import com.prabhat.StudentManagement.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public StudentServiceImpl(StudentRepository studentRepository, CourseRepository courseRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }


    @Override
    @Transactional
    public void addStudent(Student student) {
        if (student.getCourse() != null) {
            Course course = student.getCourse();
            Course dbCourse;

            dbCourse = courseRepository.findByCourseNameIgnoreCase(course.getCourseName())
                    .orElseGet(() -> courseRepository.save(course));

            student.setCourse(dbCourse);
        }

        studentRepository.save(student);
    }



    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    @Override
    @Transactional
    public boolean updateCourse(long studentId, Course course) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("No Student Found for the Corresponding ID"));

        Course oldCourse = student.getCourse();

        Course dbCourse;

        if (course.getCourseId() != 0 && courseRepository.existsById(course.getCourseId())) {
            dbCourse = courseRepository.findById(course.getCourseId()).get();
        } else if (courseRepository.existsByCourseNameIgnoreCase(course.getCourseName())) {
            dbCourse = courseRepository.findByCourseNameIgnoreCase(course.getCourseName()).get();
        } else {
            dbCourse = courseRepository.save(course);
        }


        if (oldCourse != null && oldCourse.getCourseId() == dbCourse.getCourseId()) {
            return false;
        }


        student.setCourse(dbCourse);
        studentRepository.save(student);

        if (oldCourse != null && studentRepository.countByCourse(oldCourse) == 0) {
            courseRepository.delete(oldCourse);
        }

        return true;
    }




    @Override
    @Transactional
    public void deleteStudent(long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student with ID " + studentId + " not found"));

        Course course = student.getCourse();

        // Delete student
        studentRepository.delete(student);


        if (course != null && studentRepository.countByCourse(course) == 0) {
            courseRepository.delete(course);
        }
    }



    public void checkToken(String token) {
        if (!AuthController.verifyToken(token)) {
            throw new RuntimeException("Unauthorized: Invalid token");
        }
    }

}