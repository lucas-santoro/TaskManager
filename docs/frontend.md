# 🎨 Frontend Documentation

This document provides an overview of the **Task Manager** frontend, including its structure, authentication, API interactions, and UI components.

---

## 📂 Project Structure

The frontend follows a modular structure:

```
src/
│── api/                # Handles API requests
│   │── apiClient.ts    # Axios instance with JWT authentication
│   │── taskService.ts  # Task-related API calls
│
│── assets/             # Static assets
│── components/         # Reusable UI components
│   │── TaskForm.tsx    # Task creation & editing form
│   │── TaskItem.tsx    # Single task item display
│   │── TaskList.tsx    # Task list component
│
│── pages/              # Application pages
│   │── Home.tsx        # Home page (if applicable)
│   │── Login.tsx       # Login page
│   │── Register.tsx    # User registration page
│   │── Tasks.tsx       # Main task management page
│
│── App.tsx             # Main app component
│── main.tsx            # Entry point
│── index.html          # Root HTML file
```

---

## 🔀 Navigation

The frontend uses **React Router** for navigation. Key routes include:

| Route        | Component    | Description |
|-------------|-------------|-------------|
| `/`         | `Home.tsx`  | Landing page (if applicable) |
| `/login`    | `Login.tsx` | User authentication page |
| `/register` | `Register.tsx` | User registration page |
| `/tasks`    | `Tasks.tsx` | Main task management interface |

Upon successful login, users are redirected to `/tasks`.

---

## 🔑 Authentication & Authorization

### **Login Process**
1. User submits credentials via `Login.tsx`.
2. API call is made to `/api/auth/login`.
3. If successful, JWT token is stored in `localStorage`.
4. User is redirected to `/tasks`.

### **Register Process**
1. User submits name, nickname, email, and password via `Register.tsx`.
2. API call is made to `/api/auth/register`.
3. Upon success, user is redirected to `/login`.

### **JWT Handling**
- **Storage:** Token is stored in `localStorage`.
- **Usage:** Requests include `Authorization: Bearer token`.
- **Auto-Inclusion:** `apiClient.ts` adds the token automatically to all requests.

---

## 🔗 API Integration

API requests are managed through `apiClient.ts` and `taskService.ts`.

### **Task Management Requests**

| Action       | Method | Endpoint           | Description |
|-------------|--------|--------------------|-------------|
| Get tasks   | `GET`  | `/api/tasks`       | Retrieves all tasks for the user |
| Create task | `POST` | `/api/tasks`       | Creates a new task |
| Update task | `PUT`  | `/api/tasks/:id`   | Updates an existing task |
| Delete task | `DELETE` | `/api/tasks/:id` | Deletes a task by ID |

All requests require authentication via JWT.

---

## 🛠️ Components

### **TaskForm.tsx**
Handles both creating and editing tasks.
- Controlled inputs using `useState`.
- Submits data via `createTask` or `updateTask`.

### **TaskList.tsx**
Displays the list of tasks retrieved from the API.

### **TaskItem.tsx**
Renders a single task with options to edit or delete.

---

## 🎨 Styling

- The project appears to use **CSS files** (e.g., `index.css`, `App.css`).
- No indication of Tailwind, Styled-Components, or other CSS-in-JS libraries.
- Components manage their styles separately.

---

## 🚀 Summary

The **Task Manager** frontend is a **React + TypeScript** application that:
- Uses **React Router** for navigation.
- Implements **JWT authentication**.
- Manages API calls via **Axios**.
- Provides a modular **component-based UI**.

For further questions, refer to the project documentation or reach out for support! 🚀

