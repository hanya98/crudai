const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");


const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database
let tasks = [
  {
    id: 1,
    title: "Learn Express",
    done: false,
  },
  {
    id: 2,
    title: "Finish FlyRank Assignment",
    done: false,
  },
  {
    id: 3,
    title: "Push to GitHub",
    done: true,
  },
];

// Home
app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: [
      "/health",
      "/tasks",
      "/tasks/:id"
    ]
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get task by id
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

// Create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const task = {
    id: tasks.length + 1,
    title,
    done: false
  };

  tasks.push(task);

  res.status(201).json(task);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { title, done } = req.body;

  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
