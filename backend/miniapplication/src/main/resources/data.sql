-- Insert a default user (password will be hashed when created manually via API)
-- This inserts a placeholder mostly to ensure the table exists on app start if needed
INSERT INTO users (id, username, email, password, created_at) VALUES (1, 'admin', 'admin@example.com', 'password', NOW())
ON DUPLICATE KEY UPDATE username=username;