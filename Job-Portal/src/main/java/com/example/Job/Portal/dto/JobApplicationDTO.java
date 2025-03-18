package com.example.Job.Portal.dto;

import java.time.LocalDateTime;

import com.example.Job.Portal.entity.Job;
import com.example.Job.Portal.entity.JobApplication;
import com.example.Job.Portal.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobApplicationDTO {
    private Long id;
    private User user;
    private Job job;
    private JobApplication.ApplicationStatus status;
    private LocalDateTime appliedAt;

}

