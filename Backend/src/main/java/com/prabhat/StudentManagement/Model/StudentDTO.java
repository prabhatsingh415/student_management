package com.prabhat.StudentManagement.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private long id;
    private String name;
    private String email;
    private Date dateOfJoining;
    private String courseName;
    private String courseDescription;
}
