package com.example.Job.Portal.controller;

import com.example.Job.Portal.dto.AuthRequest;
import com.example.Job.Portal.dto.JobApplicationDTO;
import com.example.Job.Portal.dto.UserDTO;
import com.example.Job.Portal.entity.Job;
import com.example.Job.Portal.entity.User;
import com.example.Job.Portal.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody AuthRequest authRequest, HttpSession session) {
        Optional<User> userOptional = userRepository.findByEmail(authRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        User user = userOptional.get();
        session.setAttribute("user", user);

        List<JobApplicationDTO> jobApplicationDTOs = user.getJobApplications().stream()
                .map(jobApp -> JobApplicationDTO.builder()
                        .id(jobApp.getId())
                        .user(null) // Avoid circular references
                        .job(Job.builder()  // ✅ Extract only necessary fields
                                .id(jobApp.getJob().getId())
                                .title(jobApp.getJob().getTitle())
                                .build())
                        .status(jobApp.getStatus())
                        .appliedAt(jobApp.getAppliedAt())
                        .build())
                .collect(Collectors.toList());

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .profile(user.getProfile())
                .resume(user.getResume())
                .jobApplications(jobApplicationDTOs)
                .build();

        return ResponseEntity.ok(userDTO);
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

