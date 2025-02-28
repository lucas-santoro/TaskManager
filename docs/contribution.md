# 🤝 Contribution Guide

Thank you for your interest in contributing to **Task Manager**! This guide will help you set up the project and follow best practices for collaboration.

Feel free to fork it and change how you want it!

---

## 🛠️ Setting Up the Project

1. **Fork the Repository**
   - Click the **Fork** button on GitHub to create your own copy of the repository.

2. **Clone the Repository**
   ```sh
   git clone https://github.com/lucas-santoro/TaskManager.git
   cd TaskManager
   ```

3. **Install Dependencies**
   - **Backend**
     ```sh
     cd taskmanager-backend
     npm install
     ```
   - **Frontend**
     ```sh
     cd taskmanager-frontend
     npm install
     ```

4. **Set Up Environment Variables**
   - Copy `.env.example-back` to `.env` and configure the necessary variables.
   - **Backend:**
     ```sh
     cp taskmanager-backend/.env.example taskmanager-backend/.env
     ```
   - **Frontend:**
     ```sh
     cp taskmanager-frontend/.env.example taskmanager-frontend/.env
     ```


5. **Run the Project**
   - **Backend:**
     ```sh
     npm run dev
     ```
   - **Frontend:**
     ```sh
     npm run dev
     ```

---

## 📏 Code Style Guidelines

- Use **TypeScript** for both backend and frontend.
- Follow the **Allman** bracket style for code formatting.
- Avoid unnecessary comments unless explaining complex logic.
- Use descriptive variable and function names in **English**.
- If an `if` statement has only one line, keep it inline.
- Try to use **OOP** for backend.

---

## 🚀 Submitting a Contribution

1. **Create a Feature Branch**
   ```sh
   git checkout -b feature/your-feature
   ```

2. **Make Your Changes & Commit**
   ```sh
   git add .
   git commit -m "feat: added new task filtering feature"
   git commit -m "fix: resolved issue with JWT expiration"
   git commit -m "docs: updated authentication documentation"
   git commit -m "refactor: improved database query performance"
   ```

3. **Push Your Changes**
   ```sh
   git push origin feature/your-feature
   ```

4. **Open a Pull Request (PR)**
   - Go to the **original repository** on GitHub.
   - Click **New Pull Request** and select your branch.
   - Provide a clear description of your changes.

---

## 🐛 Reporting Issues

If you find a bug or have a feature request, please open an **issue** on GitHub with a clear description.

---

## 📩 Contact

For any questions, feel free to reach out at **contact@lucassantoro.com**.

Happy coding! 🚀

