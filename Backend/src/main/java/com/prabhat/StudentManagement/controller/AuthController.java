package com.prabhat.StudentManagement.controller;

import com.prabhat.StudentManagement.Model.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final String ADMIN_USER = "admin";
    private static final String ADMIN_PASS = "admin123";

    private static final String TOKEN = "learnzo-admin-token-2025";

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest req) {
        if (ADMIN_USER.equals(req.getUsername()) && ADMIN_PASS.equals(req.getPassword())) {
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "token", TOKEN
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of(
                    "status", "fail",
                    "message", "Invalid credentials"
            ));
        }
    }

    public static boolean verifyToken(String t) {
        return TOKEN.equals(t);
    }
}
