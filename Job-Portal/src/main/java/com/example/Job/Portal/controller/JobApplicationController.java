package com.example.Job.Portal.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Job.Portal.entity.Job;
import com.example.Job.Portal.entity.JobApplication;
import com.example.Job.Portal.entity.JobApplication.ApplicationStatus;
import com.example.Job.Portal.entity.User;
import com.example.Job.Portal.repository.JobRepository;
import com.example.Job.Portal.repository.UserRepository;
import com.example.Job.Portal.service.JobApplicationService;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService, UserRepository userRepository, JobRepository jobRepository) {
        this.jobApplicationService = jobApplicationService;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    @PostMapping("/apply")
    public ResponseEntity<String> applyJob(@RequestParam(defaultValue = "") String email, @RequestParam Long jobId) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        Optional<Job> jobOptional = jobRepository.findById(jobId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"error\": \"User not found\"}");
        }

        if (jobOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"error\": \"Job not found\"}");
        }

        JobApplication jobApplication = JobApplication.builder()
                .user(userOptional.get())
                .job(jobOptional.get())
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        jobApplicationService.save(jobApplication);
        return ResponseEntity.ok("{\"message\": \"Application submitted successfully\"}");
    }

    @PutMapping("/{applicationId}/status/{status}")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long applicationId,
            @PathVariable ApplicationStatus status) {
        return ResponseEntity.ok(jobApplicationService.updateApplicationStatus(applicationId, status));
    }
}

