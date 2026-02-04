# Using XAMPP MySQL with this Spring Boot app

Quick steps to connect this application to the MySQL instance bundled with XAMPP on your desktop.

1. Start XAMPP Control Panel and make sure **MySQL** is running.
2. Create the database (example uses `mini_db`) and an optional DB user:

   Using mysql CLI or phpMyAdmin, run:

   ```sql
   CREATE DATABASE mini_db;
   -- Optional: create a dedicated user instead of using root
   CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON mini_db.* TO 'appuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. Configure connection credentials:

   Option A — Environment variables (recommended):

   - In PowerShell (temporary for session):
     ```powershell
     $env:JDBC_DATABASE_URL = 'jdbc:mysql://localhost:3306/mini_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC'
     $env:JDBC_DATABASE_USERNAME = 'root'            # or 'appuser'
     $env:JDBC_DATABASE_PASSWORD = ''                # or 'strong_password'
     mvn spring-boot:run
     ```

   Option B — Edit `src/main/resources/application.properties` directly and update `spring.datasource.*` values.

4. Start the Spring Boot app:

   - From the `backend/miniapplication` folder:
     ```powershell
     mvn spring-boot:run
     ```

5. Verify:

   - Check application logs for successful DB connection.
   - Visit your API endpoints and ensure data operations work.

Notes:

- The project uses `spring.jpa.hibernate.ddl-auto=update` by default so Hibernate will create/update tables automatically on startup. Change it to `none` in production.
- If your XAMPP MySQL uses a non-standard port, update the JDBC URL accordingly.
