# User Management System - Sequence Diagrams

## 📋 Overview

This document contains sequence diagrams that illustrate the key interactions and workflows within the User Management System. These diagrams are based on the Software Requirements Specification (SRS) and represent the main use cases and system behaviors.

## 🎯 Key Use Cases

### 1. User Registration
### 2. User Authentication (Login)
### 3. User Profile Management
### 4. User Dashboard Access
### 5. User Account Management (CRUD Operations)

---

## 🔄 Sequence Diagrams

### 1. User Registration Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend as React App
    participant Backend as Spring Boot API
    participant Database as MySQL
    participant Security as Spring Security

    User->>Frontend: 1. Navigate to /register
    Frontend->>User: 2. Display registration form
    User->>Frontend: 3. Submit credentials (username, email, password)
    
    Frontend->>Frontend: 4. Validate form inputs
    Frontend->>Backend: 5. POST /api/auth/register
    Note over Frontend,Backend: Request: {username, email, password}
    
    Backend->>Security: 6. Validate input data
    Security->>Backend: 7. Validation passed
    
    Backend->>Backend: 8. Encode password (BCrypt)
    Backend->>Database: 9. INSERT INTO users
    Note over Backend,Database: Store: username, email, encoded_password, created_at
    
    Database->>Backend: 10. Return created user entity
    Backend->>Backend: 11. Generate JWT token
    Backend->>Frontend: 12. Response: {user, token, success}
    
    Frontend->>Frontend: 13. Store token in localStorage
    Frontend->>User: 14. Redirect to /dashboard
    
    Note over User,Database: ✅ Registration Complete
```

### 2. User Authentication (Login) Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend as React App
    participant Backend as Spring Boot API
    participant Database as MySQL
    participant Security as Spring Security
    participant JWT as JwtUtil

    User->>Frontend: 1. Navigate to /login
    Frontend->>User: 2. Display login form
    User->>Frontend: 3. Submit credentials (username, password)
    
    Frontend->>Frontend: 4. Basic validation
    Frontend->>Backend: 5. POST /api/auth/login
    Note over Frontend,Backend: Request: {username, password}
    
    Backend->>Security: 6. Authenticate request
    Security->>Database: 7. SELECT * FROM users WHERE username = ?
    Database->>Security: 8. Return user entity
    
    Security->>Security: 9. Compare passwords (BCrypt)
    alt Authentication Successful
        Security->>JWT: 10. Generate JWT token
        JWT->>Security: 11. Return signed token
        Security->>Backend: 12. Authentication success
        Backend->>Frontend: 13. Response: {user, token, success}
        Frontend->>Frontend: 14. Store token in localStorage
        Frontend->>User: 15. Redirect to /dashboard
    else Authentication Failed
        Security->>Backend: 10a. Authentication failed
        Backend->>Frontend: 11a. Response: {error: "Invalid credentials"}
        Frontend->>User: 12a. Display error message
    end
    
    Note over User,Database: 🔐 Authentication Complete
```

### 3. Protected Route Access Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend as React App
    participant AuthGuard as RequireAuth
    participant Backend as Spring Boot API
    participant Security as Spring Security

    User->>Frontend: 1. Request protected route (/dashboard or /profile)
    Frontend->>AuthGuard: 2. Check route protection
    
    AuthGuard->>AuthGuard: 3. Check localStorage for JWT token
    alt Token Exists
        AuthGuard->>Backend: 4. Validate token via API call
        Note over AuthGuard,Backend: Authorization: Bearer <token>
        
        Backend->>Security: 5. Parse and validate JWT
        Security->>Backend: 6. Token valid?
        alt Token Valid
            Backend->>AuthGuard: 7. Response: {valid: true, user}
            AuthGuard->>Frontend: 8. Allow access to protected component
            Frontend->>User: 9. Display protected page
        else Token Invalid/Expired
            Backend->>AuthGuard: 7a. Response: {valid: false}
            AuthGuard->>Frontend: 8a. Clear localStorage
            AuthGuard->>User: 9a. Redirect to /login
        end
    else No Token
        AuthGuard->>User: 4a. Redirect to /login
    end
    
    Note over User,Security: 🛡️ Route Protection Complete
```

### 4. User Profile Management Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend as React App
    participant Backend as Spring Boot API
    participant Database as MySQL
    participant Storage as LocalStorage

    User->>Frontend: 1. Navigate to /profile
    Frontend->>AuthGuard: 2. Check authentication (reuse Protected Route flow)
    AuthGuard->>Frontend: 3. Authentication confirmed
    
    Frontend->>Backend: 4. GET /api/auth/profile
    Note over Frontend,Backend: Authorization: Bearer <token>
    
    Backend->>Security: 5. Validate JWT token
    Security->>Database: 6. Get user from token
    Database->>Backend: 7. Return user data
    Backend->>Frontend: 8. Response: {user}
    
    Frontend->>User: 9. Display profile information
    
    User->>Frontend: 10. Click "Edit Profile"
    Frontend->>User: 11. Show edit modal
    
    User->>Frontend: 12. Submit updated information
    Frontend->>Storage: 13. Update localStorage with new data
    Frontend->>User: 14. Show success message
    Frontend->>User: 15. Update UI with new information
    
    Note over User,Storage: 👤 Profile Management Complete
```

### 5. User Management (CRUD) Sequence

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend as React App
    participant Backend as Spring Boot API
    participant Database as MySQL

    Admin->>Frontend: 1. Navigate to /dashboard
    Frontend->>Backend: 2. GET /api/users (fetch all users)
    Note over Frontend,Backend: Authorization: Bearer <token>
    
    Backend->>Security: 3. Validate admin permissions
    Security->>Database: 4. SELECT * FROM users
    Database->>Backend: 5. Return user list
    Backend->>Frontend: 6. Response: {users[]}
    Frontend->>Admin: 7. Display user list/table
    
    %% Delete User Flow
    Admin->>Frontend: 8. Click "Delete" on user
    Frontend->>Admin: 9. Show confirmation dialog
    Admin->>Frontend: 10. Confirm deletion
    
    Frontend->>Backend: 11. DELETE /api/users/{id}
    Note over Frontend,Backend: Authorization: Bearer <token>
    
    Backend->>Security: 12. Validate admin permissions
    Security->>Database: 13. DELETE FROM users WHERE id = ?
    Database->>Backend: 14. Deletion success
    Backend->>Frontend: 15. Response: {success: true}
    
    Frontend->>Frontend: 16. Update user list (remove deleted user)
    Frontend->>Admin: 17. Show success message
    
    Note over Admin,Database: 🗑️ User Management Complete
```

### 6. Error Handling Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend as React App
    participant ErrorBoundary as Error Boundary
    participant Backend as Spring Boot API

    User->>Frontend: 1. Perform action (login, register, etc.)
    Frontend->>Backend: 2. API request
    
    alt Network Error
        Backend--xFrontend: 3a. Network timeout/failure
        Frontend->>ErrorBoundary: 4a. Catch network error
        ErrorBoundary->>User: 5a. Display "Network error" message
    else Server Error (5xx)
        Backend->>Frontend: 3b. Response: {error: "Internal server error"}
        Frontend->>ErrorBoundary: 4b. Catch server error
        ErrorBoundary->>User: 5b. Display "Server error" message
    else Client Error (4xx)
        Backend->>Frontend: 3c. Response: {error: "Bad request"}
        Frontend->>ErrorBoundary: 4c. Catch client error
        ErrorBoundary->>User: 5c. Display specific error message
    else Frontend Runtime Error
        Frontend->>ErrorBoundary: 3d. JavaScript runtime error
        ErrorBoundary->>User: 4d. Display "Something went wrong" fallback
    end
    
    Note over User,Backend: ⚠️ Error Handling Complete
```

---

## 🎨 Component Interaction Patterns

### Authentication Pattern
```mermaid
sequenceDiagram
    participant Client
    participant AuthGuard
    participant API
    participant Security
    
    Client->>AuthGuard: Request protected resource
    AuthGuard->>API: Validate token
    API->>Security: Parse JWT
    Security->>API: Return user context
    API->>AuthGuard: Authentication result
    AuthGuard->>Client: Allow/Deny access
```

### Data Fetching Pattern
```mermaid
sequenceDiagram
    participant Component
    participant API Utils
    participant API
    participant Database
    
    Component->>API Utils: Request data
    API Utils->>API: HTTP request with auth
    API->>Database: Query data
    Database->>API: Return data
    API->>API Utils: JSON response
    API Utils->>Component: Parsed data
    Component->>Component: Update state
```

---

## 📊 System Flow Summary

### Main User Journeys

1. **New User Journey**: Register → Login → Dashboard → Profile
2. **Returning User Journey**: Login → Dashboard → Profile/Manage Users
3. **Admin Journey**: Login → Dashboard → User Management → CRUD Operations

### Key Interactions

- **Authentication**: JWT-based stateless authentication
- **Authorization**: Role-based access control (user/admin)
- **Data Persistence**: MySQL database with JPA/Hibernate
- **Error Handling**: Comprehensive error boundaries and validation
- **State Management**: Local storage for tokens, React state for UI

---

## 🔍 Technical Notes

### Security Considerations
- All API endpoints (except auth) require valid JWT token
- Passwords are encoded using BCrypt
- CORS configuration for frontend-backend communication
- Input validation on both frontend and backend

### Performance Considerations
- Lazy loading of components
- Efficient database queries with JPA
- Token-based authentication reduces database hits
- Error boundaries prevent app crashes

### Scalability Considerations
- Stateless JWT authentication
- Modular component architecture
- RESTful API design
- Separation of concerns across layers

---

## 📚 Related Documentation

- [Software Requirements Specification (SRS)](SRS_Ruperez.pdf)
- [Architecture Diagrams](ARCHITECTURE_DIAGRAM.md)
- [API Documentation](README.md#-api-endpoints)
- [Setup Guide](README.md#-getting-started)
