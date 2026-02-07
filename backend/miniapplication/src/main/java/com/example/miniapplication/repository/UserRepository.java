package com.example.miniapplication.repository;

import com.example.miniapplication.entity.User;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class UserRepository {
    
    private final Map<Long, User> users = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }
    
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(users.get(id));
    }
    
    public Optional<User> findByUsername(String username) {
        return users.values().stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst();
    }
    
    public Optional<User> findByEmail(String email) {
        return users.values().stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst();
    }
    
    public User save(User user) {
        if (user.getId() == null) {
            user.setId(idGenerator.getAndIncrement());
        }
        users.put(user.getId(), user);
        return user;
    }
    
    public void deleteById(Long id) {
        users.remove(id);
    }
}