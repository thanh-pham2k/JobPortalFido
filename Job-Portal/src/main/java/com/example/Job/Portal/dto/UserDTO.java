package com.example.Job.Portal.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

import com.example.Job.Portal.entity.JobApplication;
import com.example.Job.Portal.entity.Profile;

@Data
@Builder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Profile profile;
    private String resume;
    private List<JobApplicationDTO> jobApplications;
}

