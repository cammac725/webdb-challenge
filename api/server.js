const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const Db = require('../data/helpers/helpers')

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ hello: 'World!' })
});

server.post('/api/projects', async (req, res) => {
  const project = req.body;
  if (project.name) {
    try {
      const added = await Db.addProject(project)
      res.status(201).json(added)
    } catch (err) {
      res.status(500).json({ message: 'Could not add the project' })
    }
  } else {
    res.status(400).json({ message: 'Please provide a name for the project' })
  }
})

module.exports = server;