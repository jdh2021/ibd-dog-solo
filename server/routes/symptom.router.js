const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET symptom - check dog_id and req.user.id
router.get('/', (req, res) => {
  console.log('in api/symptom GET');
  // response: array of symptoms
});

// POST symptom - check dog_id and req.user.id
router.post('/', (req, res) => {
  console.log('in api/symptom POST. Symptom object to post is:', req.body);
  // response: 201 - Created
});

// DELETE symptom - check dog_id and req.user.id
router.delete('/:id', (req, res) => {
  console.log('in api/symptom DELETE. Symptom id to delete is:', req.params.id);
  // response: 200 - OK
});

// PUT symptom - check dog_id and req.user.id
router.put('/', (req, res) => {
  console.log('in api/symptom PUT. Symptom object to update is:', req.body);
  // response: 200 - OK
});

module.exports = router;
