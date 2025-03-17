package com.example.Job.Portal.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.Job.Portal.entity.Company;
import com.example.Job.Portal.entity.Job;
import com.example.Job.Portal.repository.CompanyRepository;
import com.example.Job.Portal.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public JobService(JobRepository jobRepository, CompanyRepository companyRepository) {
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
    }

    public Page<Job> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    public Job addJob(Job job) {
        Company company = companyRepository.findByName(job.getCompany().getName());
        job.setPostedDate(LocalDate.now().atStartOfDay());
        job.setCompany(company);

        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job job) {
        Job existingJob = getJobById(id);
        Company company = companyRepository.findByName(job.getCompany().getName());
        job.setPostedDate(LocalDate.now().atStartOfDay());
        job.setCompany(company);
        if (existingJob != null) {
            return jobRepository.save(Job.builder()
                    .id(existingJob.getId())
                    .title(job.getTitle())
                    .description(job.getDescription())
                    .company(job.getCompany())
                    .location(job.getLocation())
                    .jobType(job.getJobType())
                    .salaryRange(job.getSalaryRange())
                    .postedBy(job.getPostedBy())
                    .postedDate(job.getPostedDate())
                    .build());
        }
        return null;
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public List<Job> getAllJobsSorted(Sort sort) {
        return jobRepository.findAll(sort);
    }
}

