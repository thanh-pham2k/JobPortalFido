package com.example.Job.Portal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.Job.Portal.entity.Job;
import com.example.Job.Portal.entity.JobApplication;
import com.example.Job.Portal.entity.JobApplication.ApplicationStatus;
import com.example.Job.Portal.entity.User;
import com.example.Job.Portal.repository.JobApplicationRepository;
import com.example.Job.Portal.repository.JobRepository;
import com.example.Job.Portal.repository.UserRepository;
import com.example.Job.Portal.service.JobApplicationService;

@ExtendWith(MockitoExtension.class)
class JobApplicationServiceTest {

	@Mock
	private JobApplicationRepository jobApplicationRepository;

	@Mock
	private UserRepository userRepository;

	@Mock
	private JobRepository jobRepository;

	@InjectMocks
	private JobApplicationService jobApplicationService;

	private User user;
	private Job job;
	private JobApplication jobApplication;

	@BeforeEach
	void setUp() {
		user = User.builder().id(1L).name("John Doe").build();
		job = Job.builder().id(1L).title("Software Engineer").build();
		jobApplication = JobApplication.builder()
				.id(1L)
				.user(user)
				.job(job)
				.status(ApplicationStatus.PENDING)
				.appliedAt(LocalDateTime.now())
				.build();
	}

	@Test
	void applyForJob_Success() {
		when(userRepository.findById(1L)).thenReturn(Optional.of(user));
		when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
		when(jobApplicationRepository.findByUserAndJob(user, job)).thenReturn(Optional.empty());
		when(jobApplicationRepository.save(any(JobApplication.class))).thenReturn(jobApplication);

		JobApplication result = jobApplicationService.applyForJob(1L, 1L);

		assertNotNull(result);
		assertEquals(ApplicationStatus.PENDING, result.getStatus());
		verify(jobApplicationRepository, times(1)).save(any(JobApplication.class));
	}

	@Test
	void applyForJob_UserNotFound() {
		when(userRepository.findById(1L)).thenReturn(Optional.empty());

		Exception exception = assertThrows(RuntimeException.class, () -> {
			jobApplicationService.applyForJob(1L, 1L);
		});

		assertEquals("User not found", exception.getMessage());
	}

	@Test
	void applyForJob_JobNotFound() {
		when(userRepository.findById(1L)).thenReturn(Optional.of(user));
		when(jobRepository.findById(1L)).thenReturn(Optional.empty());

		Exception exception = assertThrows(RuntimeException.class, () -> {
			jobApplicationService.applyForJob(1L, 1L);
		});

		assertEquals("Job not found", exception.getMessage());
	}

	@Test
	void applyForJob_UserAlreadyApplied() {
		when(userRepository.findById(1L)).thenReturn(Optional.of(user));
		when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
		when(jobApplicationRepository.findByUserAndJob(user, job)).thenReturn(Optional.of(jobApplication));

		Exception exception = assertThrows(RuntimeException.class, () -> {
			jobApplicationService.applyForJob(1L, 1L);
		});

		assertEquals("User đã apply job này rồi!", exception.getMessage());
	}

	@Test
	void updateApplicationStatus_Success() {
		when(jobApplicationRepository.findById(1L)).thenReturn(Optional.of(jobApplication));
		when(jobApplicationRepository.save(any(JobApplication.class))).thenReturn(jobApplication);

		JobApplication result = jobApplicationService.updateApplicationStatus(1L,
				JobApplication.ApplicationStatus.ACCEPTED);

		assertNotNull(result);
		assertEquals(JobApplication.ApplicationStatus.ACCEPTED, result.getStatus());
		verify(jobApplicationRepository, times(1)).save(jobApplication);
	}

	@Test
	void updateApplicationStatus_ApplicationNotFound() {
		when(jobApplicationRepository.findById(1L)).thenReturn(Optional.empty());

		Exception exception = assertThrows(RuntimeException.class, () -> {
			jobApplicationService.updateApplicationStatus(1L, ApplicationStatus.ACCEPTED);
		});

		assertEquals("Application not found", exception.getMessage());
	}
}
