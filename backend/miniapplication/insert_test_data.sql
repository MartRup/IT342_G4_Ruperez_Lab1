-- Insert test data into the users table
USE mini_db;

-- Clear existing data if any
DELETE FROM users;

-- Insert test users
INSERT INTO users (username, email, password, created_at) VALUES
('john_doe', 'john@example.com', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy2QIDM', NOW()),
('jane_smith', 'jane@example.com', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy2QIDM', NOW()),
('bob_wilson', 'bob@example.com', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy2QIDM', NOW());

-- Verify the insert
SELECT * FROM users;
