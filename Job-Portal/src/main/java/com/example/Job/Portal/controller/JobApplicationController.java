package com.example.Job.Portal.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Job.Portal.dto.JobApplicationDTO;
import com.example.Job.Portal.dto.UserDTO;
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

    public JobApplicationController(JobApplicationService jobApplicationService, UserRepository userRepository,
            JobRepository jobRepository) {
        this.jobApplicationService = jobApplicationService;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    @PostMapping("/apply")
    public ResponseEntity<UserDTO> applyJob(
            @RequestParam(defaultValue = "") String email, 
            @RequestParam Long jobId) {
    
        jobApplicationService.applyForJob(email, jobId);
        Optional<User> userOptional = userRepository.findByEmail(email);
    
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
    
        User user = userOptional.get();
    
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
    

    @PatchMapping("/{applicationId}/status/{status}")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long applicationId,
            @PathVariable ApplicationStatus status) {
        return ResponseEntity.ok(jobApplicationService.updateApplicationStatus(applicationId, status));
    }

    @GetMapping
    public ResponseEntity<Page<JobApplicationDTO>> findAll(Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "appliedAt"));
        return ResponseEntity.ok(jobApplicationService.findAll(sortedPageable));
    }

}
