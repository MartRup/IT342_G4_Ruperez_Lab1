package com.example.miniapplication.controller;

import com.example.miniapplication.entity.User;
import com.example.miniapplication.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> list() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public static class CreateUserRequest {
        private String username;
        private String email;
        private String password;

        public CreateUserRequest() { }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody CreateUserRequest req) {
        // Check if user already exists
        if (userService.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        if (userService.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        
        User created = userService.createUser(req.getUsername(), req.getEmail(), req.getPassword());
        return ResponseEntity.created(URI.create("/api/users/" + created.getId())).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}