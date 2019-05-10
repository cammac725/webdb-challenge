const router = require('express').Router();
const db = require('../data/dbConfig')

const Projects = require('./projects-model')

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.getProjects()
    res.status(200).json(projects)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  db('projects')
    .where({ id })
    .first()
    .then(projects => {
      db('actions')
        .where({ 'project_id': id })
        .then(actions => {
          projects.actions = actions;
          return res.status(200).json(projects)
        })
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
  // try {
  //   const project = await Projects.getProjectById(req.params.id)
  //   if (project) {
  //     res.status(200).json(project)
  //   } else {
  //     res.status(404).json({
  //       message: 'Project not found'
  //     })
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: 'Server error' })
  // }
})

router.get('/:id/actions', (req, res) => {
  db('projects')
    .join('actions', 'projects.id', 'actions.project_id')
    .select('projects.name', 'actions.name', 'actions.notes', 'actions.completed')
    .where({ project_id: req.params.id })
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error' })
    })
})

router.post('/', async (req, res) => {
  const project = req.body;
  if (project.name) {
    try {
      const added = await Projects.addProject(project)
      res.status(201).json(added)
    } catch (err) {
      res.status(500).json({ message: 'Could not add the project' })
    }
  } else {
    res.status(400).json({ message: 'Please provide a name for the project' })
  }
})

module.exports = router