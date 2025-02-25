# ❓ Frequently Asked Questions (FAQ)

### **1. How do I set up the project locally?**
You can follow the [contribution guide](./contribution.md) to set up the project. The process involves cloning the repository, installing dependencies, and configuring the `.env` file.

### **2. What technologies does Task Manager use?**
- **Backend:** Node.js, TypeScript, Express, PostgreSQL  
- **Frontend:** React, TypeScript  
- **Authentication:** JWT  

### **3. How does authentication work?**
The API uses **JSON Web Tokens (JWT)** for authentication. When a user logs in, they receive a token that must be sent in the `Authorization` header for protected requests.

### **4. My JWT token expired. What should I do?**
JWT tokens expire after **1 hour**. If your token has expired, you need to log in again to obtain a new one.

### **5. How can I suggest a new feature?**
You can open an issue on GitHub and describe your suggestion. We also accept Pull Requests! Check out the [contribution guide](./contribution.md) for details.

### **6. How do I run tests?**
Currently, the project does not have automated tests. If you want to contribute by adding tests, we would greatly appreciate it!

### **7. How do I report a bug?**
Open an issue on GitHub explaining the problem. If possible, provide an example of how to reproduce it.

### **8. How can I delete my account?**
There is no direct API functionality to delete accounts at the moment. If needed, please contact us at **contact@lucassantoro.com**.

### **9. Can I use this project commercially?**
Yes! The **Task Manager** is licensed under the **MIT License**, which means you are free to use, modify, and distribute it.

### **10. How do I set up the database?**
You can check the [database documentation](./database.md) for instructions on creating and configuring the database schema.

---

If you have any other questions, feel free to reach out!