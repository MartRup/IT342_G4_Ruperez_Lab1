# Connecting to XAMPP MySQL

## Prerequisites
- XAMPP must be installed on your system
- Start XAMPP Control Panel
- Start the Apache and MySQL services

## Database Configuration
The application is already configured to connect to XAMPP MySQL with these settings:
- Host: localhost
- Port: 3306 (default MySQL port)
- Database: miniapp (as named in phpMyAdmin)
- Username: root
- Password: (empty)

## Steps to Run the Backend with XAMPP

1. Open XAMPP Control Panel
2. Start the MySQL service
3. Ensure the database 'miniapp' exists (you can create it via phpMyAdmin or MySQL command line):
   ```sql
   CREATE DATABASE IF NOT EXISTS miniapp;
   ```

4. Run the backend application:
   ```bash
   cd IT342_G4_Ruperez_Lab1/backend/miniapplication
   ./mvnw spring-boot:run
   ```

## Troubleshooting

If you get "Access denied" errors:
- Verify MySQL service is running in XAMPP
- Check if root user has a password set in XAMPP
- If root has a password, update the `application.properties` file:
  ```
  spring.datasource.username=root
  spring.datasource.password=your_xampp_root_password
  ```

## API Endpoints
- Base URL: http://localhost:8080
- H2 Console (if switched back): http://localhost:8080/h2-console
- Actuator endpoints: http://localhost:8080/actuator

## Default User
On first run, the application creates a default admin user:
- Username: admin
- Password: admin123