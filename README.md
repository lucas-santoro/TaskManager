# Task Manager


## 🚀 About

**Task Manager** is a full-stack task management application designed for both practical use and as a learning resource for new developers. The project is fully documented, making it an excellent reference for those who want to understand how a complete full-stack application works.

### 🌟 Features

- User authentication with **JWT**
- Secure route protection
- Task creation, updating, and deletion
- Task prioritization and status management
- Fully documented API & database structure

Whether you're looking to learn, contribute, or extend its functionality, **Task Manager** is open for experimentation.

---

## 📦 Technologies

### **Backend**

- **Node.js** with **TypeScript**
- **Express.js** for API handling
- **PostgreSQL** for database management
- **JWT Authentication** for secure access

### **Frontend**

- **React.js** with **TypeScript**
- **React Router** for navigation
- **Axios** for API requests
- **CSS Modules** for styling

---

## 📖 Documentation

Full documentation is available in the [`docs/`](./docs/) folder:

- [📌 API & Endpoints](./docs/api.md)
- [🗄️ Database Structure](./docs/database.md)
- [🎨 Frontend & User Flow](./docs/frontend.md)
- [🔑 Authentication & Route Protection](./docs/authentication.md)
- [🤝 Contribution Guide](./docs/contribution.md)
- [❓ FAQ](./docs/faq.md)

---

## ⚡ How to Run the Project

### 1️⃣ Clone the repository

```sh
git clone https://github.com/lucas-santoro/TaskManager.git
cd TaskManager
```

### 2️⃣ Install dependencies

- **Backend:**

```sh
cd taskmanager-backend
npm install
```

- **Frontend:**

```sh
cd ../taskmanager-frontend
npm install
```

### 3️⃣ Set up environment variables

Copy the example `.env` files and configure them:

```sh
cp taskmanager-backend/.env.example taskmanager-backend/.env
cp taskmanager-frontend/.env.example taskmanager-frontend/.env
```

### 4️⃣ Set up the database

Before running the backend, make sure the database is set up correctly:

```sh
psql -U your_user -d your_database -f taskmanager-backend/database/schema.sql
```

This command will create all necessary tables as defined in the schema file.

### 5️⃣ Start the project

- **Backend:**

```sh
npm run dev
```

- **Frontend:**

```sh
npm run dev
```

The frontend will be available at `http://localhost:5173/`.

---

## 🤝 Contribution

Want to contribute? Check out our [contribution guide](./docs/contribution.md).

---

## 📜 License

This project is licensed under the **MIT License**. See the [`LICENSE`](./LICENSE) file for more details.

