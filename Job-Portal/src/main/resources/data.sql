-- Delete existing data before inserting new records
TRUNCATE TABLE job_applications RESTART IDENTITY CASCADE;
TRUNCATE TABLE jobs RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE companies RESTART IDENTITY CASCADE;


-- Reset sequences
SELECT setval('job_applications_id_seq', (SELECT COALESCE(MAX(id), 1) FROM job_applications), false);
SELECT setval('jobs_id_seq', (SELECT COALESCE(MAX(id), 1) FROM jobs), false);
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM users), false);
SELECT setval('companies_id_seq', (SELECT COALESCE(MAX(id), 1) FROM companies), false);

-- Insert Companies (20 records)
INSERT INTO companies (name) VALUES
    ('Google'),
    ('Amazon'),
    ('Facebook'),
    ('Microsoft'),
    ('Apple'),
    ('Tesla'),
    ('Netflix'),
    ('IBM'),
    ('Intel'),
    ('Salesforce'),
    ('Adobe'),
    ('Spotify'),
    ('Uber'),
    ('Airbnb'),
    ('Oracle'),
    ('Twitter'),
    ('LinkedIn'),
    ('Snapchat'),
    ('Cisco'),
    ('Nvidia');

-- Insert Users (20 records)
INSERT INTO users (name, email, password, resume) VALUES
    ('John Doe', 'john.doe@example.com', 'password123', 'resume_john.pdf'),
    ('Admin', 'admin@example.com', 'password456', 'resume_jane.pdf'),
    ('Alice Johnson', 'alice.johnson@example.com', 'password789', 'resume_alice.pdf'),
    ('Robert Brown', 'robert.brown@example.com', 'password111', 'resume_robert.pdf'),
    ('Emily Davis', 'emily.davis@example.com', 'password222', 'resume_emily.pdf'),
    ('William Wilson', 'william.wilson@example.com', 'password333', 'resume_william.pdf'),
    ('Emma Martinez', 'emma.martinez@example.com', 'password444', 'resume_emma.pdf'),
    ('Michael Thomas', 'michael.thomas@example.com', 'password555', 'resume_michael.pdf'),
    ('Sophia White', 'sophia.white@example.com', 'password666', 'resume_sophia.pdf'),
    ('David Lee', 'david.lee@example.com', 'password777', 'resume_david.pdf'),
    ('Olivia Harris', 'olivia.harris@example.com', 'password888', 'resume_olivia.pdf'),
    ('Daniel Clark', 'daniel.clark@example.com', 'password999', 'resume_daniel.pdf'),
    ('Ava Lewis', 'ava.lewis@example.com', 'password000', 'resume_ava.pdf'),
    ('James Walker', 'james.walker@example.com', 'passwordaaa', 'resume_james.pdf'),
    ('Mia Hall', 'mia.hall@example.com', 'passwordbbb', 'resume_mia.pdf'),
    ('Benjamin Allen', 'benjamin.allen@example.com', 'passwordccc', 'resume_benjamin.pdf'),
    ('Charlotte Young', 'charlotte.young@example.com', 'passwordddd', 'resume_charlotte.pdf'),
    ('Ethan Hernandez', 'ethan.hernandez@example.com', 'passwordeee', 'resume_ethan.pdf'),
    ('Amelia King', 'amelia.king@example.com', 'passwordfff', 'resume_amelia.pdf'),
    ('Lucas Wright', 'lucas.wright@example.com', 'passwordggg', 'resume_lucas.pdf'),
    ('Logan Brooks', 'logan.brooks@example.com', 'passwordhhh', 'resume_logan.pdf'),
    ('Evelyn Martin', 'evelyn.martin@example.com', 'passwordiii', 'resume_evelyn.pdf');

-- Insert Jobs (20 records)
INSERT INTO jobs (title, description, company_id, location, job_type, salary_range, posted_by, posted_date) VALUES
    ('Software Engineer', 'Develop backend applications', 1, 'San Francisco, CA', 'Full-time', '$120,000 - $150,000', 'hr@google.com', '2025-03-17'),
    ('Frontend Developer', 'Develop web applications', 2, 'New York, NY', 'Full-time', '$100,000 - $130,000', 'hr@amazon.com', '2025-03-17'),
    ('Data Scientist', 'Analyze large data sets', 3, 'Seattle, WA', 'Full-time', '$130,000 - $160,000', 'hr@facebook.com', '2025-03-17'),
    ('DevOps Engineer', 'Manage CI/CD pipelines', 4, 'Remote', 'Contract', '$110,000 - $140,000', 'hr@microsoft.com', '2025-03-17'),
    ('AI Engineer', 'Work on deep learning models', 5, 'Cupertino, CA', 'Full-time', '$140,000 - $170,000', 'hr@apple.com', '2025-03-17'),
    ('Java Developer', 'Develop Java applications', 1, 'San Francisco, CA', 'Full-time', '$90,000 - $120,000', 'hr@google.com', '2025-03-17'),
    ('Python Developer', 'Develop Python applications', 2, 'New York, NY', 'Full-time', '$80,000 - $110,000', 'hr@amazon.com', '2025-03-17'),
    ('Senior Software Engineer', 'Develop software applications', 3, 'Seattle, WA', 'Full-time', '$150,000 - $180,000', 'hr@facebook.com', '2025-03-17'),
    ('Cloud Engineer', 'Work on cloud infrastructure', 4, 'Remote', 'Contract', '$100,000 - $130,000', 'hr@microsoft.com', '2025-03-17'),
    ('Web Developer', 'Develop web applications', 5, 'Cupertino, CA', 'Full-time', '$80,000 - $110,000', 'hr@apple.com', '2025-03-17'),
    ('Android Developer', 'Develop Android applications', 1, 'San Francisco, CA', 'Full-time', '$90,000 - $120,000', 'hr@google.com', '2025-03-17'),
    ('iOS Developer', 'Develop iOS applications', 2, 'New York, NY', 'Full-time', '$100,000 - $130,000', 'hr@amazon.com', '2025-03-17'),
    ('SDET', 'Develop software test cases', 3, 'Seattle, WA', 'Full-time', '$100,000 - $130,000', 'hr@facebook.com', '2025-03-17'),
    ('SRE', 'Manage software reliability', 4, 'Remote', 'Contract', '$80,000 - $110,000', 'hr@microsoft.com', '2025-03-17'),
    ('UX Designer', 'Design user interfaces', 5, 'Cupertino, CA', 'Full-time', '$80,000 - $110,000', 'hr@apple.com', '2025-03-17'),
    ('Data Engineer', 'Develop data pipelines', 1, 'San Francisco, CA', 'Full-time', '$90,000 - $120,000', 'hr@google.com', '2025-03-17'),
    ('Machine Learning Engineer', 'Work on machine learning models', 2, 'New York, NY', 'Full-time', '$110,000 - $140,000', 'hr@amazon.com', '2025-03-17'),
    ('Research Scientist', 'Conduct research in AI', 3, 'Seattle, WA', 'Full-time', '$80,000 - $110,000', 'hr@facebook.com', '2025-03-17'),
    ('Product Manager', 'Manage product development', 4, 'Remote', 'Contract', '$120,000 - $150,000', 'hr@microsoft.com', '2025-03-17'),
    ('IT Manager', 'Manage IT infrastructure', 5, 'Cupertino, CA', 'Full-time', '$100,000 - $130,000', 'hr@apple.com', '2025-03-17'),
    ('QA Engineer', 'Develop software test cases', 1, 'San Francisco, CA', 'Full-time', '$80,000 - $110,000', 'hr@google.com', '2025-03-17'),
    ('DevOps Engineer', 'Manage CI/CD pipelines', 2, 'New York, NY', 'Full-time', '$100,000 - $130,000', 'hr@amazon.com', '2025-03-17'),
    ('Cloud Engineer', 'Work on cloud infrastructure', 3, 'Seattle, WA', 'Full-time', '$90,000 - $120,000', 'hr@facebook.com', '2025-03-17'),
    ('Web Developer', 'Develop web applications', 4, 'Remote', 'Contract', '$80,000 - $110,000', 'hr@microsoft.com', '2025-03-17'),
    ('Android Developer', 'Develop Android applications', 5, 'Cupertino, CA', 'Full-time', '$100,000 - $130,000', 'hr@apple.com', '2025-03-17');

-- Insert Job Applications (20 records)
INSERT INTO job_applications (user_id, job_id, status, applied_at) VALUES
    (1, 1, 'PENDING', '2025-03-17 08:00:00'),
    (2, 2, 'ACCEPTED', '2025-03-17 08:10:00'),
    (3, 3, 'PENDING', '2025-03-17 08:20:00'),
    (4, 4, 'REJECTED', '2025-03-17 08:30:00'),
    (5, 5, 'PENDING', '2025-03-17 08:40:00'),
    (6, 1, 'ACCEPTED', '2025-03-17 08:50:00'),
    (7, 2, 'PENDING', '2025-03-17 09:00:00'),
    (8, 3, 'PENDING', '2025-03-17 09:10:00'),
    (9, 4, 'REJECTED', '2025-03-17 09:20:00'),
    (10, 5, 'ACCEPTED', '2025-03-17 09:30:00'),
    (11, 1, 'PENDING', '2025-03-17 09:40:00'),
    (12, 2, 'PENDING', '2025-03-17 09:50:00');

