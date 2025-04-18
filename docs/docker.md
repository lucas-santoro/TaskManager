# 🐳 Docker Setup

This project is fully containerized using Docker and `docker-compose`.

## 🛆 Services

- **taskmanager-backend** — Node.js + Express + TypeScript
- **taskmanager-frontend** — React + Vite + TypeScript
- **PostgreSQL** — version 15 with volume persistence

---

## ▶️ Running the Project

1. Make sure Docker and Docker Compose are installed.
2. From the root of the project, run:

```bash
docker-compose up --build
```

3. Open your browser:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## ⚙️ Environment Variables

You can customize credentials and database connection by editing a `.env` file in the root directory.

Default values:

```env
DATABASE_URL=postgresql://user:pass@db:5432/taskmanager
```

These values are used in `docker-compose.yml` and passed to both backend and database services.

---

## 🧼 Cleaning Up

To stop and remove everything, including the database volume:

```bash
docker-compose down --volumes
```
