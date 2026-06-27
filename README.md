# Grex - AI Powered Team Collaboration Platform

Grex is a modern team collaboration platform that helps organizations manage teams, meetings, tasks, notes, files, and AI-powered document insights from a single workspace.

The application follows a microservice architecture consisting of separate Frontend, Backend, and AI services.

---

## Architecture

```
                  +----------------+
                  |    Next.js     |
                  |   Frontend     |
                  +--------+-------+
                           |
                    REST APIs / JWT
                           |
                +----------+----------+
                |                     |
        Express.js API          FastAPI AI Service
                |                     |
         PostgreSQL DB        AI Models / NLP
```

---

## Repositories

| Service | Repository |
|----------|------------|
| Frontend | https://github.com/Santhosh-776/grex-frontend |
| Backend | https://github.com/Santhosh-776/grex-backend |
| AI Service | https://github.com/Santhosh-776/grex-ai |

---

## Features

### Authentication

- JWT Authentication
- Secure HTTP-only Cookies
- Role Based Access Control

### Team Management

- Create Teams
- Invite Members
- Manage Roles
- Team Dashboard

### Meeting Management

- Schedule Meetings
- Meeting Notes
- Attendance
- Upcoming Meeting Timeline

### Task Management

- Kanban Board
- Task Assignment
- Due Dates
- Status Tracking

### File Management

- Upload Documents
- Organize Team Files
- Search Files

### Notes

- Rich Text Notes
- Shared Team Notes
- Collaborative Workspace

### AI Features

- AI Document Analysis
- Document Summarization
- Key Insight Extraction
- Intelligent Search
- Future Chat with Documents

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query
- Zustand

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Multer
- Prisma / pg

### AI Service

- FastAPI
- Python
- LangChain
- Sentence Transformers
- HuggingFace
- FAISS
- Ollama/OpenAI (optional)

---

## Folder Structure

```
grex
│
├── grex-frontend
│
├── grex-backend
│
└── grex-ai
```

---

## Screenshots

### Dashboard

<img width="1920" height="1000" alt="image" src="https://github.com/user-attachments/assets/72d74106-bb64-44d4-9aa8-e0cb82872085" />

### Kanban Board

<img width="1920" height="1000" alt="image" src="https://github.com/user-attachments/assets/1f27dc8d-7f38-4817-b11d-7f8a7e592ab7" />


### Team Page

<img width="1920" height="1000" alt="image" src="https://github.com/user-attachments/assets/f12210a6-3764-40e4-885d-c3325d733fde" />


### AI Document Analysis

<img width="1920" height="1000" alt="image" src="https://github.com/user-attachments/assets/454cd118-c0df-43d8-93fb-41d953682375" />

