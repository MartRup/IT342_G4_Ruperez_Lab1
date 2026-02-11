# User Management System

A full-stack web application for user registration, authentication, and account management built with modern technologies.

## 🚀 Features

- **User Registration**: Create new accounts with username, email, and password
- **Secure Authentication**: JWT-based login system with session management
- **Protected Routes**: Dashboard access restricted to authenticated users
- **User Management**: View and delete user accounts
- **Responsive UI**: Modern React interface with routing

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **CSS Modules** - Scoped styling

### Backend
- **Spring Boot 4.0.2** - Java web framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database access abstraction
- **JWT** - Token-based authentication
- **MySQL** - Relational database

## 📁 Project Structure

```
IT342_G4_Ruperez_Lab1/
├── backend/                 # Spring Boot application
│   └── miniapplication/
│       ├── src/main/java/  # Java source code
│       │   └── com/example/miniapplication/
│       │       ├── controller/  # REST controllers
│       │       ├── entity/      # JPA entities
│       │       ├── repository/  # Data access layers
│       │       ├── service/     # Business logic
│       │       └── config/      # Configuration classes
│       └── src/main/resources/
│           ├── application.properties  # App configuration
│           └── data.sql               # Initial data
├── web/                    # React frontend
│   └── src/
│       ├── assets/pages/   # Page components (Login, Register, Dashboard)
│       ├── components/     # Reusable components
│       └── App.jsx         # Main application component
└── docs/                   # Documentation
```

## 🔧 Getting Started

### Prerequisites
- Java 11+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend/miniapplication
```

2. Configure database in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the application:
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create new user |
| DELETE | `/api/users/{id}` | Delete user |

## 🔐 Authentication Flow

1. User registers with username, email, and password
2. User logs in with credentials
3. Server validates and returns JWT token
4. Client stores token and uses it for authenticated requests
5. Protected routes check for valid token

## 📱 Pages

- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Dashboard** (`/dashboard`) - Protected user area (requires authentication)

## 🎯 Key Components

### Backend
- `UserController` - Handles user-related HTTP requests
- `UserService` - Business logic for user operations
- `UserRepository` - Database operations
- `User` - JPA entity representing user data
- `WebConfig` - CORS and security configuration

### Frontend
- `App.jsx` - Main router configuration
- `Login.jsx` - Authentication form
- `Dashboard.jsx` - Protected user dashboard
- `RequireAuth.jsx` - Route protection wrapper
- `Header.jsx` - Navigation component

## 📊 System Diagrams

### 📋 Available Diagrams
- **[Architecture Diagrams](ARCHITECTURE_DIAGRAM.md)** - Comprehensive system architecture documentation
- **[Sequence Diagrams](SEQUENCE_DIAGRAMS.md)** - Detailed interaction flows and use case scenarios
- **[ERD Documentation](ERD_Documentation.md)** - Entity Relationship Diagram and database schema
- **[UML Class Diagram](UML_CLASS_DIAGRAM.md)** - Authentication system component relationships
- **[Software Requirements Specification (SRS)](docs/SRS_Ruperez.pdf)** - Detailed project requirements and specifications

### 🏗️ Key Architecture Components

#### System Overview
- **Three-Tier Architecture**: Frontend (React) ↔ Backend (Spring Boot) ↔ Database (MySQL)
- **RESTful API Communication**: HTTP/JSON between layers
- **JWT Authentication**: Token-based security for protected routes

#### Frontend Architecture (React)
- **Component-Based Structure**: Modular React components with clear separation of concerns
- **Route Protection**: `RequireAuth` wrapper for authenticated routes
- **State Management**: Local storage for JWT tokens and user data
- **Responsive UI**: Modern CSS with mobile-first approach

#### Backend Architecture (Spring Boot)
- **Layered Architecture**: Controller → Service → Repository → Entity
- **Spring Security**: Authentication and authorization framework
- **JPA/Hibernate**: Object-relational mapping for database operations
- **JWT Utilities**: Token generation and validation

#### Data Flow
1. **Authentication Flow**: Login → JWT Token → Protected Access
2. **User Management**: CRUD operations with proper validation
3. **Profile Management**: User data retrieval and updates

### 🔄 Core Workflows

#### Authentication Workflow
```
User → Login/Register → API Call → JWT Token → Dashboard Access
```

#### User Management Workflow
```
Dashboard → User Operations → API Requests → Database → Response
```

#### Profile Management Workflow
```
Dashboard → Profile Page → Local Storage → Edit Modal → Update
```

## 📄 Documentation

- [Software Requirements Specification (SRS)](docs/SRS_Ruperez.pdf)
- [XAMPP Setup Guide](docs/USE_XAMPP.md)
- [Architecture Diagrams](ARCHITECTURE_DIAGRAM.md)

## 👨‍💻 Author

Raymart Ruperez - IT342 G4

## 📝 License

This project is for educational purposes.