
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "aaa",
    description: "abababababababab"
  },
  {
    id: 2,
    title: "bbb",
    description: "sdsdsdsdsdsdsdsdsd"
  },
  {
    id: 3,
    title: "ccc",
    description: "fgfgfgfgfgfgfgfgfg"
  },
  {
    id: 4,
    title: "ddd",
    description: "hjhjhjhjhjhjhjhjhj"
  }
];

// app.use(express.json());

app.get('/tasks', (req, res) => {
  res.status(200).json({ tasks });
});


app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json({ task });
});




app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
  };

  tasks.push(newTask);
  res.status(201).json({ message: 'Task created', task: newTask });
});
   



app.put('/tasks/:id', (req, res) => {
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  tasks[taskIndex] = {
    id: parseInt(req.params.id),
    title,
    description,
  };

  res.status(200).json({ message: 'Task updated', task: tasks[taskIndex] });
});


app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted' });
});


app.listen(port, () => {
  console.log(`port is running on:${port}`);
});
