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
  const {title, url, techs } = request.body
  const newRepository = {
    id: uuid(),
    title,
    url, // TODO deve ser url do github 
    techs,
    likes: 0
  }

  repositories.push(newRepository)
  return response.json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
