package com.example.Job.Portal.controller;

import com.example.Job.Portal.dto.AuthRequest;
import com.example.Job.Portal.entity.User;
import com.example.Job.Portal.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest, HttpSession session) {
        Optional<User> userOptional = userRepository.findByEmail(authRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"error\": \"User not found\"}");
        }

        User user = userOptional.get();
        session.setAttribute("user", user);
        return ResponseEntity.ok("{\"message\": \"Login successful\"}");
    }

    @GetMapping("/status")
    public ResponseEntity<String> checkStatus(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.ok("{\"authenticated\": false}");
        }
        return ResponseEntity.ok("{\"authenticated\": true, \"email\": \"" + user.getEmail() + "\"}");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("{\"message\": \"Logout successful\"}");
    }
}

