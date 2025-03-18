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
- **Backend**: Spring Boot, H2 Database
- **Frontend**: ReactJS, Ant Design

## Features
### **Admin Features**
- Manage job listings (add, update, delete)
- View applicants for each job
- Manage company profiles
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

### **1. Backend**
```sh
mvn clean install
mvn spring-boot:run
```
- Starts the Spring Boot backend.

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

Now the **README** is **short, clear, and well-structured**. 🚀 Let me know if you need any refinements! 😊
