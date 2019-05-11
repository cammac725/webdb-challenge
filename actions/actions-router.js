const router = require('express').Router();

const Actions = require('./actions-model')

router.get('/', async (req, res) => {
  try {
    const actions = await Actions.getActions()
    res.status(200).json(actions)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const action = await Actions.getActionById(req.params.id)
    if (action) {
      res.status(200).json(action)
    } else {
      res.status(404).json({ message: 'Action not found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', async (req, res) => {
  const action = req.body;
  if (action.name) {
    try {
      const added = await Actions.addAction(action)
      res.status(201).json(added)
    } catch (err) {
      res.status(500).json({ message: 'Could not add the action' })
    }
  } else {
    res.status(400).json({ message: 'Please provide a name for the action' })
  }
})

module.exports = router;