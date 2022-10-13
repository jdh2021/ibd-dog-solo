const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET medication - check dog_id and req.user.id
router.get('/', (req, res) => {
  console.log('in /api/medication GET');
  // response: array of medications
});

// POST medication - check dog_id and req.user.id
router.post('/', (req, res) => {
  console.log('in /api/medication POST. Medication object to post is:', req.body);
  // response: 201 - Created
});

// DELETE medication - check dog_id and req.user.id
router.delete('/:id', (req, res) => {
  console.log('in /api/medication DELETE by id. Medication id to delete is:', req.params.id);
  // response: 200 - OK
});

// PUT medication - check dog_id and req.user.id
router.put('/:id', (req, res) => {
  console.log('in /api/medication PUT by id. Medication id to update is:', req.params.id);
  // response: 200 - OK
});

module.exports = router;
