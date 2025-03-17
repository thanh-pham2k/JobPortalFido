---

# Job Portal Management System

## Overview
This is a **Job Portal Management System** that allows administrators to manage job listings and track user applications. Users can browse job listings and apply for jobs. The system consists of a **Spring Boot backend** and a **ReactJS frontend with Ant Design UI**.

## Tech Stack
- **Backend**: Spring Boot, H2 Database
- **Frontend**: ReactJS, Ant Design

## Features
### **Admin Features**
- Manage job listings (add, update, delete)
- View applicants for each job
- Manage company profiles

### **User Features**
- Log in/Logout
- Create Jobs
- Browse available jobs
- Apply for jobs
- Track application status(PENDING, ACCEPTED, REJECTED)
## Database Models
- **User**: Stores user information and their job applications
- **Profile**: Stores user profile details (bio, LinkedIn, GitHub, skills, etc.)
- **Company**: Stores company details and their job postings
- **Job**: Contains job details, including location, salary, and type
- **Job Application**: Tracks applications submitted by users

## How to Run
1. **Backend**:
   ```sh
   mvn spring-boot:run
   ```
   - Runs the Spring Boot application with an in-memory H2 database.

2. **Frontend**:
   ```sh
   npm install
   npm start
   ```
   - Starts the ReactJS application.

---
