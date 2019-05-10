const db = require('../dbConfig')

module.exports = {
  addProject,
  addAction,
  getProjectById
}

function addProject(project) {
  return db('projects').insert(project, 'id')
}

function addAction(action) {

}

function getProjectById(id) {
  return db('projects')
    .where({ id })
    .first()
}