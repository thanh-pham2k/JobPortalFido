package com.example.Job.Portal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.Job.Portal.entity.User;


public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    @EntityGraph(attributePaths = {"jobApplications", "jobApplications.job"})
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

}

