# Task API

A simple CRUD REST API built with Express.js.

## Features

- Get all tasks
- Get task by ID
- Create a task
- Update a task
- Delete a task
- Health check
- Swagger documentation

## Installation

```bash
npm install
node server.js
```

Server runs on:

```
http://localhost:3000
```

Swagger Docs:

```
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Home |
| GET | /health | Health Check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

## Tech Stack

- Node.js
- Express.js
- Swagger UI