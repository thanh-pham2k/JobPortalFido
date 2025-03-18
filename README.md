# Job Portal Management System

## Overview
The **Job Portal Management System** enables administrators to manage job listings and track user applications. Users can browse job postings and apply for jobs. The system includes a **Spring Boot backend** and a **ReactJS frontend with Ant Design UI**.

## UML Diagram
```

+-----------------+        +-----------------+
|     User        |        |   Profile       |
+-----------------+        +-----------------+
| - id: Long      | 1    1 | - id: Long      |
| - name: String  |--------| - bio: String   |
| - email: String |        | - avatarUrl: String |
| - password: String |     | - linkedin: String |
| - resume: String |        | - github: String |
+-----------------+        | - skills: String |
| + getProfile(): Profile | | + getUser(): User |
| + getJobApplications():  | +-----------------+
|   List<JobApplication>   |
+-----------------+

       | 1
       |
       | *
+---------------------+
|  JobApplication    |
+---------------------+
| - id: Long        |
| - status: Enum    |
| - appliedAt: LocalDateTime |
+---------------------+
| + getUser(): User  |
| + getJob(): Job    |
+---------------------+
       | *
       |
       | 1
+-----------------+        +-----------------+
|      Job       |        |   Company       |
+-----------------+        +-----------------+
| - id: Long      |  *   1 | - id: Long      |
| - title: String |--------| - name: String  |
| - description: String |  +-----------------+
| - location: String |     | + getJobs(): List<Job> |
| - jobType: String |      +-----------------+
| - salaryRange: String |
| - postedBy: String |
| - postedDate: LocalDateTime |
+-----------------+
| + getCompany(): Company |
| + getJobApplications(): List<JobApplication> |
+-----------------+
```


## Tech Stack
- **Backend**: Spring Boot, Postgres
- **Frontend**: ReactJS, Ant Design

## Features
### **Admin Features**
- Manage job listings (add, update, delete)
- View applicants for each job
- Manage user accounts

### **User Features**
- Login/Logout (simulated with email only, no password required)
- Browse available jobs
- Apply for jobs (users can apply only once per job)
- Search jobs by title
- Track application status (`PENDING`, `ACCEPTED`, `REJECTED`)

## Database Models
- **User**: Stores user details and job applications.
- **Profile**: Stores user profile details (bio, LinkedIn, GitHub, skills, etc.).
- **Company**: Stores company information and job listings.
- **Job**: Contains job details, including location, salary, and type.
- **Job Application**: Tracks applications submitted by users.

## How to Run

Make sure you run the data.sql script before testing.


### **1. Backend**


**Pull Docker image**
```sh
docker run -d \
  --name job_portal_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=job_portal \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:latest
```

**Starts the Spring Boot backend.
**
```sh
mvn clean install
mvn spring-boot:run
```




### **2. Frontend**
```sh
npm install
npm start
```
- Starts the ReactJS application.

## **User Roles**
### **Regular User**
- Can log in using an email (no password required).
- Can apply for jobs after logging in.
- Cannot apply for the same job twice.

### **Admin User** (`admin@gmail.com`)
- Logs in directly using email (no password required).
- Manages:
  1. **Users** (`/managements/users`): View and manage all registered users.
  2. **Jobs** (`/managements/jobs`): Add, delete, and update job listings.
  3. **Job Applications** (`/managements/job-applications`): Track all job applications.

---

## Demo
- Main Screen
![image](https://github.com/user-attachments/assets/b39e3639-54be-4f71-a647-b46d5ad605de)

- Job Search


![image](https://github.com/user-attachments/assets/81b7ac47-8589-40ff-b1ba-e75659611285)

- Login & Apply for a Job


![image](https://github.com/user-attachments/assets/635f6b34-b886-4eb8-9f89-a5d43649085b)

- Apply for a Job (Already Applied Jobs Cannot Be Reapplied)


![image](https://github.com/user-attachments/assets/87ced542-951b-4d01-b641-dfca6304628f)



### Admin Panel
- Admin Login (admin@gmail.com) - Panel Button Visible


![image](https://github.com/user-attachments/assets/a2baaadf-0e7b-49b9-8835-6161c908738a)
- Successful Login - Access to Admin Panel


![image](https://github.com/user-attachments/assets/dfcf927d-a6e1-452d-b7a7-e00ada3d4784)


### User Management (Add, Edit, Update Users)
- User List & Editing


![image](https://github.com/user-attachments/assets/285f0be4-7bff-43cb-8f02-d7dd2afc1cf0)
![image](https://github.com/user-attachments/assets/16987193-e979-4568-99ea-9a10b5282c1a)
![image](https://github.com/user-attachments/assets/452f12b0-00f5-4965-acea-a2a696137260)

- After Adding a User


![image](https://github.com/user-attachments/assets/df8d7ba9-0f49-45f7-a614-c9163d53f597)

- Update (Fixed Typo in "Frontend DeveloperR")


![image](https://github.com/user-attachments/assets/8c50a704-0c17-463f-aed8-0bf39faa0494)

- Successful Update

![image](https://github.com/user-attachments/assets/4ba0aaee-246d-4e53-b894-a51c66097015)

- Delete Recently Updated User


![image](https://github.com/user-attachments/assets/b3166af7-5d18-4b94-ae9d-47246ac1cd31)

### Job Management (CRUD Operations for Jobs)
- Follows the same workflow as user management.


### Application Management (Approve, Reject, Edit Applications)

- Approve First 3, Reject the Next 2

![image](https://github.com/user-attachments/assets/0f553c0e-5155-454b-8708-04b5cfd35fb2)


## Further improve
1️⃣ Write unit tests → Increase reliability and ensure code quality.

2️⃣ Add APIs for job search business logic → Enhance job search functionalities.

3️⃣ Implement filters for tables → Improve data management and user experience.

4️⃣ Integrate Spring Security for authentication → Currently using stateful authentication, consider switching to JWT for stateless authentication.

5️⃣ Improve UI/UX → Enhance the user interface and overall user experience.
