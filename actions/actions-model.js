const db = require('../data/dbConfig')

module.exports = {
  getActions,
  getActionById,
  addAction
}

function getActions() {
  return db('actions')
}

function getActionById(id) {
  return db('actions')
    .where({ id })
    .first()
}

function addAction(action) {
  return db('actions').insert(action, 'id')
}