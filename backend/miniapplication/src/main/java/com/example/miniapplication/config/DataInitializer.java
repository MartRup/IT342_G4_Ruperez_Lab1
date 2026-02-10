package com.example.miniapplication.config;

import com.example.miniapplication.service.UserService;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserService userService;

    public DataInitializer(UserService userService) {
        this.userService = userService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void handleApplicationReady() {
        // Add a small delay to ensure database connection is established
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Check if admin user already exists
        try {
            if (userService.findByUsername("admin").isEmpty()) {
                // Create a default admin user
                userService.createUser("admin", "admin@example.com", "admin123");
                System.out.println("Default admin user created: admin / admin123");
            } else {
                logger.info("Admin user already exists, skipping initialization");
            }
        } catch (Exception e) {
            logger.warn("Could not initialize default user: {}", e.getMessage());
            logger.debug("Initialization error details:", e);
        }
    }
}