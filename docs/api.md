# ✅ Task Manager API Documentation  

This document provides an overview of the Task Manager API, including authentication, task management, and business logic.  

## 🌐 Base URL  
```
http://localhost:5000/api
```

---

# 🔑 Authentication  

## **Register User**  
Creates a new user account.  

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

## **User Login**  
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

# 📝 Task Management  

### **Get All Tasks**  
Retrieves all tasks of the authenticated user.  

**Endpoint:**  
```
GET /api/tasks/
```

**Response (200 OK):**  
```json
[
  {
    "id": 1,
    "title": "First Task",
    "description": "Example task",
    "status": "pending",
    "priority": 2,
    "createdAt": "2025-02-25T12:00:00Z"
  }
]
```

---

### **Get Task by ID**  
Retrieves a specific task by its ID.  

**Endpoint:**  
```
GET /api/tasks/:id
```

**Response (200 OK):**  
```json
{
  "id": 1,
  "title": "First Task",
  "description": "Example task",
  "status": "pending",
  "priority": 2,
  "createdAt": "2025-02-25T12:00:00Z"
}
```

---

### **Create a New Task**  
Creates a new task for the authenticated user.  

**Endpoint:**  
```
POST /api/tasks/
```

**Request Body:**  
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": 1
}
```

**Response (201 Created):**  
```json
{
  "id": 2,
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": 1,
  "createdAt": "2025-02-25T12:05:00Z"
}
```

---

### **Update a Task**  
Updates an existing task by ID.  

**Endpoint:**  
```
PUT /api/tasks/:id
```

**Request Body:**  
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed",
  "priority": 3
}
```

**Response (200 OK):**  
```json
{
  "id": 2,
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed",
  "priority": 3,
  "createdAt": "2025-02-25T12:05:00Z",
  "updatedAt": "2025-02-25T12:10:00Z"
}
```

---

### **Delete a Task**  
Deletes a task by ID.  

**Endpoint:**  
```
DELETE /api/tasks/:id
```

**Response (200 OK):**  
```json
{
  "message": "Task deleted successfully"
}
```

---

# 🏗️ Business Logic  

## **AuthManager (Authentication Logic)**  
Handles user authentication, registration, and token generation.  

### **Register a User**  
- Hashes the password using `bcryptjs`.  
- Stores the user in the `users` table.  
- Returns the user data (excluding the password).  

### **Login a User**  
- Verifies the `identifier` (either email or nickname).  
- Checks if the password matches using `bcrypt.compare`.  
- Generates a JWT token with `id` and `identifier`.  

---

## **TaskManager (Task Operations)**  
Manages task creation, retrieval, updating, and deletion in PostgreSQL.  

### **Get All Tasks**  
Retrieves all tasks of a user, ordered by `priority` (ASC) and `created_at` (DESC).  
```sql
SELECT * FROM tasks WHERE user_id = $1 ORDER BY priority ASC, created_at DESC
```

### **Get Task by ID**  
Fetches a single task only if it belongs to the user.  
```sql
SELECT * FROM tasks WHERE id = $1 AND user_id = $2
```

### **Create a Task**  
Inserts a new task into the `tasks` table.  
```sql
INSERT INTO tasks (title, description, status, created_at, user_id, priority) 
VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING *
```

### **Update a Task**  
Updates specific task fields.  
```sql
UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4 
WHERE id = $5 AND user_id = $6 RETURNING *
```

### **Delete a Task**  
Deletes a task only if the user owns it.  
```sql
DELETE FROM tasks WHERE id = $1 AND user_id = $2
```
