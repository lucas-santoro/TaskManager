# 🔑 Authentication Documentation

This document describes the authentication system of the **Task Manager** API, including user registration, login, and route protection.

## 🌍 Authentication Flow

1. A user registers with a **name**, **nickname**, **email**, and **password**.
2. The password is securely **hashed** before being stored in the database.
3. The user logs in using either their **email** or **nickname**.
4. Upon successful authentication, a **JWT token** is issued.
5. Protected routes require the token to be included in the **Authorization** header.

---

## 📌 Endpoints

### **User Registration**
Registers a new user in the system.

**Endpoint:**
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "nickname": "johnd",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "nickname": "johnd",
  "email": "john@example.com",
  "created_at": "2025-02-25T12:00:00Z"
}
```

---

### **User Login**
Authenticates a user and returns a JWT token.

**Endpoint:**
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "identifier": "john@example.com",
  "password": "securepassword"
}
```
(`identifier` can be either `email` or `nickname`.)

**Response (200 OK):**
```json
{
  "token": "jwt_token_here"
}
```

---

## 🔐 JWT Token Structure
- **Algorithm:** HS256
- **Expiration:** 1 hour
- **Payload:**
```json
{
  "id": 1,
  "identifier": "johnd",
  "iat": 1700000000,
  "exp": 1700003600
}
```

---

## 🔄 Middleware: Route Protection

All protected routes require a valid JWT token.

### **Authentication Middleware (`AuthMiddleware.ts`)**
- Checks if the request contains a valid `Authorization` header.
- Decodes and verifies the JWT token.
- Attaches the `user.id` to the request object.
- If authentication fails, returns `401 Unauthorized`.

**Example Unauthorized Response:**
```json
{
  "message": "Unauthorized"
}
```

**Example Invalid Token Response:**
```json
{
  "message": "Invalid token"
}
```

---

## 🔒 Routes That Require Authentication

All **task-related** routes require authentication using the `AuthMiddleware`:

- `GET /api/tasks/`
- `GET /api/tasks/:id`
- `POST /api/tasks/`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Include the JWT token in the request header:
```
Authorization: Bearer your_jwt_token
```

---

## 🏗️ Authentication Logic

### **Register a User (`AuthManager.ts`)**
- Hashes the password using `bcryptjs` before storing it in the database.
- Returns the user’s details (excluding the password).

### **Login a User (`AuthManager.ts`)**
- Searches for the user by `email` or `nickname`.
- Compares the provided password with the stored hash.
- Generates a **JWT token** with the user's ID and identifier.

### **Verify Authentication (`AuthMiddleware.ts`)**
- Extracts the token from the `Authorization` header.
- Decodes the token using `jsonwebtoken` and checks validity.
- Attaches the authenticated user’s ID to the request object.

---

## 📜 Conclusion
This authentication system ensures that only registered and authenticated users can access protected resources. By using **JWT tokens**, the API enables secure session management while maintaining scalability.

