package com.example.Job.Portal.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Job.Portal.dto.JobApplicationDTO;
import com.example.Job.Portal.entity.Job;
import com.example.Job.Portal.entity.JobApplication;
import com.example.Job.Portal.entity.JobApplication.ApplicationStatus;
import com.example.Job.Portal.entity.User;
import com.example.Job.Portal.repository.JobApplicationRepository;
import com.example.Job.Portal.repository.JobRepository;
import com.example.Job.Portal.repository.UserRepository;

import jakarta.persistence.EntityManager;


@Service
public class JobApplicationService {
    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public JobApplication applyForJob(String email, Long jobId) {
        Optional<User> userOptional = userRepository.findByEmail(email.trim());
        Optional<Job> jobOptional = jobRepository.findById(jobId);

        if (userOptional.isEmpty() || jobOptional.isEmpty()) {
            throw new RuntimeException("User or Job not found!");
        }

        User user = userOptional.get();
        Job job = jobOptional.get();

        JobApplication jobApplication = JobApplication.builder()
                .user(user)
                .job(job)
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        JobApplication result =  jobApplicationRepository.saveAndFlush(jobApplication);
        entityManager.refresh(userOptional.get());
        
        return result;
    }

    public JobApplication updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);
        return jobApplicationRepository.save(application);
    }


    public Page<JobApplicationDTO> findAll(Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "appliedAt"));
        return jobApplicationRepository.findAll(sortedPageable).map(this::buildDTO);
    }

    private JobApplicationDTO buildDTO(JobApplication jobApplication) {
        return JobApplicationDTO.builder()
                .id(jobApplication.getId())
                .user(jobApplication.getUser())
                .job(jobApplication.getJob())
                .status(jobApplication.getStatus())
                .appliedAt(jobApplication.getAppliedAt())
                .build();
    }

}
