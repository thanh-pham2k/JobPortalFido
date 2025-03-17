-- Insert Companies
INSERT INTO
    companies (id, name)
VALUES
    (1, 'Google'),
    (2, 'Amazon'),
    (3, 'Facebook');

-- Insert Users
INSERT INTO
    users (id, name, email, password, resume)
VALUES
    (
        1,
        'John Doe',
        'john.doe@example.com',
        'password123',
        'resume_john.pdf'
    ),
    (
        2,
        'Jane Smith',
        'jane.smith@example.com',
        'password456',
        'resume_jane.pdf'
    ),
    (
        3,
        'Alice Johnson',
        'alice.johnson@example.com',
        'password789',
        'resume_alice.pdf'
    );

-- Insert Profiles
INSERT INTO
    profiles (
        id,
        user_id,
        bio,
        avatar_url,
        linkedin,
        github,
        skills
    )
VALUES
    (
        1,
        1,
        'Software Engineer with 5 years of experience',
        'https://example.com/john_avatar.jpg',
        'https://linkedin.com/in/johndoe',
        'https://github.com/johndoe',
        'Java, Spring Boot, AWS'
    ),
    (
        2,
        2,
        'Full Stack Developer passionate about web technologies',
        'https://example.com/jane_avatar.jpg',
        'https://linkedin.com/in/janesmith',
        'https://github.com/janesmith',
        'Angular, React, Node.js'
    ),
    (
        3,
        3,
        'AI Engineer specializing in deep learning and NLP',
        'https://example.com/alice_avatar.jpg',
        'https://linkedin.com/in/alicejohnson',
        'https://github.com/alicejohnson',
        'Python, TensorFlow, PyTorch'
    );

-- Insert Jobs
INSERT INTO
    jobs (
        id,
        title,
        description,
        company_id,
        location,
        job_type,
        salary_range,
        posted_by,
        posted_date
    )
VALUES
    (
        1,
        'Software Engineer',
        'Develop scalable backend applications',
        1,
        'San Francisco, CA',
        'Full-time',
        '$120,000 - $150,000',
        'recruiter@google.com',
        '2025-03-17 10:00:00'
    ),
    (
        2,
        'Frontend Developer',
        'Build modern web applications',
        2,
        'New York, NY',
        'Full-time',
        '$100,000 - $130,000',
        'recruiter@amazon.com',
        '2025-03-17 10:05:00'
    ),
    (
        3,
        'Machine Learning Engineer',
        'Work on AI and deep learning models',
        3,
        'Seattle, WA',
        'Full-time',
        '$130,000 - $160,000',
        'recruiter@facebook.com',
        '2025-03-17 10:10:00'
    );

-- Insert Job Applications
INSERT INTO
    job_applications (id, user_id, job_id, status, applied_at)
VALUES
    (1, 1, 1, 'PENDING', '2025-03-17 11:00:00'),
    (2, 2, 1, 'ACCEPTED', '2025-03-17 11:05:00'),
    (3, 1, 2, 'PENDING', '2025-03-17 11:10:00'),
    (4, 3, 3, 'REJECTED', '2025-03-17 11:15:00');