# User Management System - Updated Architecture Diagram

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER MANAGEMENT SYSTEM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │   FRONTEND      │    │    BACKEND      │                    │
│  │   (React)       │◄──►│  (Spring Boot)  │                    │
│  │                 │    │                 │                    │
│  │ Port: 5173      │    │ Port: 8083      │                    │
│  └─────────────────┘    └─────────────────┘                    │
│           │                       │                            │
│           │              ┌─────────────────┐                   │
│           │              │     DATABASE    │                   │
│           └──────────────►│    (MySQL)     │                   │
│                          │                 │                   │
│                          │ Port: 3306      │                   │
│                          └─────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Frontend Architecture (React)

```
┌─────────────────────────────────────────────────────────────────┐
│                        REACT APP                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │     App.jsx     │    │   Header.jsx    │                    │
│  │                 │    │                 │                    │
│  │ • Router Setup  │    │ • Navigation    │                    │
│  │ • Route Guards  │    │ • Auth State    │                    │
│  └─────────────────┘    └─────────────────┘                    │
│           │                       │                            │
│           ▼                       ▼                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    PAGES                               │   │
│  │                                                         │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │   │
│  │ │   Login     │ │  Register   │ │  Dashboard  │         │   │
│  │ │             │ │             │ │             │         │   │
│  │ │ • Auth Form │ │ • Reg Form  │ │ • Welcome   │         │   │
│  │ │ • JWT Store │ │ • Validation│ │ • Account   │         │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘         │   │
│  │                                                         │   │
│  │ ┌─────────────┐                                         │   │
│  │ │   Profile   │ ←─ NEW!                                 │   │
│  │ │             │                                         │   │
│  │ │ • User Info │                                         │   │
│  │ │ • Edit Form │                                         │   │
│  │ │ • Local     │                                         │   │
│  │ │   Storage   │                                         │   │
│  │ └─────────────┘                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   COMPONENTS                            │   │
│  │                                                         │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │   │
│  │ │ RequireAuth │ │ErrorBoundary│ │   API Utils  │         │   │
│  │ │             │ │             │ │             │         │   │
│  │ │ • Route     │ │ • Error     │ │ • HTTP      │         │   │
│  │ │   Protection│ │   Handling  │ │   Requests  │         │   │
│  │ │ • JWT Check │ │ • Fallback  │ │ • Token     │         │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Backend Architecture (Spring Boot)

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT APP                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    CONTROLLERS                          │   │
│  │                                                         │   │
│  │ ┌─────────────┐ ┌─────────────┐                         │   │
│  │ │AuthController│ │UserController│                         │   │
│  │ │             │ │             │                         │   │
│  │ │ • /login    │ │ • /users    │                         │   │
│  │ │ • /register │ │ • /users/{id}│                         │   │
│  │ │ • /profile  │ ←─ NEW!       │                         │   │
│  │ └─────────────┘ └─────────────┘                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                │
│                              ▼                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     SERVICES                            │   │
│  │                                                         │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │   │
│  │ │UserService  │ │UserDetails  │ │   JwtUtil   │         │   │
│  │ │             │ │ServiceImpl  │ │             │         │   │
│  │ │ • CRUD Ops  │ │ • Auth      │ │ • Token     │         │   │
│  │ │ • Validation│ │ • User Load │ │   Generation│         │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                │
│                              ▼                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  REPOSITORIES                           │   │
│  │                                                         │   │
│  │ ┌─────────────┐                                         │   │
│  │ │UserRepository│                                         │   │
│  │ │             │                                         │   │
│  │ │ • JPA       │                                         │   │
│  │ │ • Database  │                                         │   │
│  │ │   Access    │                                         │   │
│  │ └─────────────┘                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                │
│                              ▼                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     ENTITIES                             │   │
│  │                                                         │   │
│  │ ┌─────────────┐                                         │   │
│  │ │    User     │                                         │   │
│  │ │             │                                         │   │
│  │ │ • id        │                                         │   │
│  │ │ • username  │                                         │   │
│  │ │ • email     │                                         │   │
│  │ │ • password  │                                         │   │
│  │ │ • createdAt │                                         │   │
│  │ └─────────────┘                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

```
┌─────────────┐    1. Login Request    ┌─────────────┐
│   USER      │──────────────────────► │   FRONTEND  │
│             │                       │   (React)   │
└─────────────┘                       └─────────────┘
       ▲                                      │
       │                                      │ 2. API Call
       │                                      │    (JWT Auth)
       │                                      ▼
       │                               ┌─────────────┐
       │                               │  BACKEND    │
       │                               │(Spring Boot)│
       │                               └─────────────┘
       │                                      │
       │                                      │ 3. Validate
       │                                      │    Credentials
       │                                      ▼
       │                               ┌─────────────┐
       │                               │  DATABASE   │
       │                               │  (MySQL)    │
       │                               └─────────────┘
       │                                      │
       │                                      │ 4. User Data
       │                                      ▼
       │                               ┌─────────────┐
       │                               │  BACKEND    │
       │                               │(Spring Boot)│
       │                               └─────────────┘
       │                                      │
       │                                      │ 5. JWT Token
       │                                      ▼
       │                               ┌─────────────┐
       │                               │   FRONTEND  │
       │                               │   (React)   │
       │                               └─────────────┘
       │                                      │
       │                                      │ 6. Store Token
       │                                      ▼
       │                               ┌─────────────┐
       │                               │ LOCAL       │
       │                               │ STORAGE     │
       │                               └─────────────┘
       │                                      │
       │                                      │ 7. Navigate
       │                                      ▼
┌─────────────┐                       ┌─────────────┐
│   USER      │◄──────────────────────│   DASHBOARD │
│             │   8. Welcome Page    │   / PROFILE │
└─────────────┘                       └─────────────┘
```

## 🎨 UI Component Hierarchy

```
App.jsx
├── Header.jsx
│   ├── Navigation Links
│   │   ├── Home
│   │   ├── Login (unauthenticated)
│   │   ├── Register (unauthenticated)
│   │   ├── Dashboard (authenticated)
│   │   └── Profile (authenticated) ← NEW!
│   └── Logout Button (authenticated)
├── ErrorBoundary.jsx
└── Routes
    ├── /login → Login.jsx
    ├── /register → Register.jsx
    ├── /dashboard → RequireAuth → Dashboard.jsx
    └── /profile → RequireAuth → Profile.jsx ← NEW!
```

## 🔐 Authentication Flow

```
1. User visits /login or /register
2. Submits form with credentials
3. Frontend sends POST to /api/auth/login or /api/auth/register
4. Backend validates credentials
5. Backend generates JWT token
6. Backend returns token + user info
7. Frontend stores token in localStorage
8. Frontend redirects to /dashboard
9. User can now access:
   - /dashboard (main dashboard)
   - /profile (user profile) ← NEW!
10. All protected routes check JWT token
```

## 📊 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User authentication | No |
| POST | `/api/auth/register` | User registration | No |
| GET | `/api/auth/profile` | Get current user profile | Yes ← NEW! |
| GET | `/api/users` | Get all users | Yes |
| GET | `/api/users/{id}` | Get user by ID | Yes |
| DELETE | `/api/users/{id}` | Delete user | Yes |

## 🗂️ File Structure

```
IT342_G4_Ruperez_Lab1/
├── backend/
│   └── miniapplication/
│       └── src/main/java/com/example/miniapplication/
│           ├── controller/
│           │   ├── AuthController.java ← Updated!
│           │   └── UserController.java
│           ├── entity/
│           │   └── User.java
│           ├── service/
│           │   ├── UserService.java
│           │   └── UserDetailsServiceImpl.java
│           └── util/
│               └── JwtUtil.java
└── web/
    └── src/
        ├── assets/pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   └── Profile.jsx ← NEW!
        ├── components/
        │   ├── Header.jsx ← Updated!
        │   ├── RequireAuth.jsx
        │   └── ErrorBoundary.jsx
        ├── utils/
        │   └── api.js ← Updated!
        └── App.jsx ← Updated!
```

## ✨ New Features Added

### Profile Page (`/profile`)
- **User Information Display**: Shows username, email, account status
- **Edit Functionality**: Modal dialog to update profile information
- **Data Persistence**: Uses localStorage for profile data
- **Responsive Design**: Matches existing dashboard styling
- **Protected Route**: Only accessible to authenticated users

### Backend API Enhancement
- **New Endpoint**: `GET /api/auth/profile` for fetching current user data
- **Authentication**: JWT token required for access
- **Error Handling**: Proper error responses for unauthorized access

### Navigation Updates
- **Header Enhancement**: Added Profile link for authenticated users
- **Route Protection**: Profile page wrapped with RequireAuth component
- **User Experience**: Seamless navigation between dashboard and profile

This architecture provides a solid foundation for user management with the new profile functionality integrated seamlessly into the existing system.
