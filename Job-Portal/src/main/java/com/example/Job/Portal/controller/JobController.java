package com.example.Job.Portal.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Job.Portal.entity.Job;
import com.example.Job.Portal.repository.JobRepository;
import com.example.Job.Portal.service.JobService;
import com.example.Job.Portal.specification.JobSpecification;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class JobController {

    private JobService jobService;
    private JobRepository jobRepository;

    @GetMapping("/jobs/search")
    public ResponseEntity<List<Job>> searchJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String salaryRange,
            @RequestParam(required = false) String postedBy) {

        Specification<Job> spec = Specification.where(JobSpecification.hasTitle(title))
                .and(JobSpecification.hasCompany(company))
                .and(JobSpecification.hasLocation(location))
                .and(JobSpecification.hasJobType(jobType))
                .and(JobSpecification.hasSalaryRange(salaryRange))
                .and(JobSpecification.postedBy(postedBy));

        List<Job> jobs = jobRepository.findAll(spec);
        return ResponseEntity.ok(jobs);
    }

    /**
     * Get all jobs
     * 
     * @return List of jobs
     */
    @GetMapping("/jobs")
    public ResponseEntity<Page<Job>> getAllJobs(
            Pageable pageable) {

        Page<Job> jobs = jobService.getAllJobs(pageable);
        return ResponseEntity.ok(jobs);
    }

    /**
     * Get job by id
     * 
     * @param id Job id
     * @return Job
     */
    @GetMapping("/jobs/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    /**
     * Add new job
     * 
     * @param job Job to be added
     * @return Added job
     */
    @PostMapping("/jobs")
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    /**
     * Update job by id
     * 
     * @param id  Job id
     * @param job Job to be updated
     * @return Updated job
     */
    @PutMapping("/jobs/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }

    /**
     * Delete job by id
     * 
     * @param id Job id
     */
    @DeleteMapping("/jobs/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }
}