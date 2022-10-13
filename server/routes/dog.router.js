const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET dog - check req.user.id
router.get('/', (req, res) => {
  console.log('in /api/dog GET');
  // response: dog object
});

// PUT dog - check dog id and req.user.id
router.put('/', (req, res) => {
  console.log('in api/dog PUT. Dog object to update is:', req.body);
  // response: 200 - OK
});

module.exports = router;
