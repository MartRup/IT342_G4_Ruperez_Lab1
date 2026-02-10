-- Create database if not exists
CREATE DATABASE IF NOT EXISTS mini_db;

-- Use the database
USE mini_db;

-- Grant privileges (if needed)
GRANT ALL PRIVILEGES ON mini_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Spring Boot will auto-create the users table with JPA
-- But here's the manual schema if needed:
/*
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/
