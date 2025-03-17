package com.example.Job.Portal.specification;

import org.springframework.data.jpa.domain.Specification;

import com.example.Job.Portal.entity.Job;

public class JobSpecification {

    public static Specification<Job> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> title == null ? null
                : criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Job> hasCompany(String company) {
        return (root, query, criteriaBuilder) -> company == null ? null
                : criteriaBuilder.like(root.get("company"), "%" + company + "%");
    }

    public static Specification<Job> hasLocation(String location) {
        return (root, query, criteriaBuilder) -> location == null ? null
                : criteriaBuilder.like(root.get("location"), "%" + location + "%");
    }

    public static Specification<Job> hasJobType(String jobType) {
        return (root, query, criteriaBuilder) -> jobType == null ? null
                : criteriaBuilder.equal(root.get("jobType"), jobType);
    }

    public static Specification<Job> hasSalaryRange(String salaryRange) {
        return (root, query, criteriaBuilder) -> salaryRange == null ? null
                : criteriaBuilder.equal(root.get("salaryRange"), salaryRange);
    }

    public static Specification<Job> postedBy(String postedBy) {
        return (root, query, criteriaBuilder) -> postedBy == null ? null
                : criteriaBuilder.equal(root.get("postedBy"), postedBy);
    }
}