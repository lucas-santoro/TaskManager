# 🗄️ Database Documentation

This document describes the database schema for the **Task Manager** API, including table structures, relationships, and constraints.

---

## 📌 Tables Overview

The database consists of the following tables:
- `users` → Stores user information.
- `tasks` → Stores task details, linked to users.

---

## 👤 Users Table

**Table Name:** `users`

| Column     | Type                      | Constraints                | Default Value          |
|------------|---------------------------|----------------------------|------------------------|
| `id`       | `integer`                  | `PRIMARY KEY`, `NOT NULL`  | Auto-increment        |
| `name`     | `varchar(100)`             | `NOT NULL`                 |                        |
| `email`    | `varchar(150)`             | `NOT NULL`, `UNIQUE`       |                        |
| `password` | `text`                     | `NOT NULL`                 |                        |
| `created_at` | `timestamp`              |                             | `CURRENT_TIMESTAMP`    |
| `nickname` | `varchar(50)`              | `NOT NULL`, `UNIQUE`       |                        |

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE (email)`
- `UNIQUE (nickname)`

**Create Table Statement:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nickname VARCHAR(50) NOT NULL UNIQUE
);
```

---

## ✅ Tasks Table

**Table Name:** `tasks`

| Column       | Type                      | Constraints                | Default Value          |
|-------------|---------------------------|----------------------------|------------------------|
| `id`        | `integer`                  | `PRIMARY KEY`, `NOT NULL`  | Auto-increment        |
| `title`     | `varchar(255)`             | `NOT NULL`                 |                        |
| `description` | `text`                    |                            |                        |
| `status`    | `varchar(20)`              |                            | `'pendente'`           |
| `created_at` | `timestamp`               |                            | `CURRENT_TIMESTAMP`    |
| `user_id`   | `integer`                  | `NOT NULL`, `FOREIGN KEY`  |                        |
| `priority`  | `integer`                  | `NOT NULL`                 | `1`                    |

**Indexes:**
- `PRIMARY KEY (id)`

**Foreign Keys:**
- `user_id` → References `users(id)`

**Create Table Statement:**
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL REFERENCES users(id),
    priority INTEGER NOT NULL DEFAULT 1
);
```

---

## 🔗 Table Relationships

- Each `task` is associated with a `user` via `user_id`.
- A user can have multiple tasks, but a task belongs to only one user.

**ER Diagram Representation:**
```
Users (1) ──── (∞) Tasks
```

---

## 🔄 Example Queries

### **Insert a New User**
```sql
INSERT INTO users (name, email, password, nickname) 
VALUES ('John Doe', 'john@example.com', 'hashedpassword', 'johndoe');
```

### **Insert a New Task**
```sql
INSERT INTO tasks (title, description, status, user_id, priority) 
VALUES ('First Task', 'Complete this example', 'pending', 1, 2);
```

### **Retrieve All Tasks for a User**
```sql
SELECT * FROM tasks WHERE user_id = 1;
```

### **Update Task Status**
```sql
UPDATE tasks SET status = 'completed' WHERE id = 1;
```

### **Delete a Task**
```sql
DELETE FROM tasks WHERE id = 1;
```

---

This database schema ensures **data integrity**, **referential consistency**, and **scalability** for the Task Manager API. 🚀

