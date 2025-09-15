package com.prabhat.StudentManagement.exceptions;

public class UnauthorizedAdminException extends RuntimeException {
    public UnauthorizedAdminException(String message) {
        super(message);
    }
}
