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
    url, // TODO deve ser url do github http://github.com/...
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

  const updatedRepository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }
  repositories.splice(repositoryIndex, 1, updatedRepository)

  return response.json(updatedRepository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  
  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({error: "id não encontrado."})
  }
  
  repositories.splice(repositoryIndex, 1)
  
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  
  const repositoryIndex = repositories.findIndex((repository) => repository.id === id)
  
  if (repositoryIndex < 0) {
    return response.status(400).json({error: "id não encontrado."})
  }
  
  const repository = repositories[repositoryIndex]
  
  repository.likes += 1
  
  return response.json(repository)
});

module.exports = app;
