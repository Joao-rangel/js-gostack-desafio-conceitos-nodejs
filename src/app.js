const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const listRepositories = repositories

  return response.json(listRepositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRepository)
  return response.json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "id not found." })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories.splice(repositoryIndex, 1, repository)

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "id not found." })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "id not found." })
  }

  const repository = repositories[repositoryIndex]

  repository.likes += 1

  return response.json({ likes: repository.likes })
});

module.exports = app;
