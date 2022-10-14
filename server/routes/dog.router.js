const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET dog - check req.user.id
router.get('/', (req, res) => {
  console.log('in /api/dog GET by user id');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user id is:', req.user.id);
  // response: dog object
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "dog" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows[0]); // one dog per user
    }).catch((error) => {
      console.log('Error in /dog GET:', error);
      res.sendStatus(500);
    });
} else {
  // forbidden if not logged in
  res.sendStatus(403);
}
});

// PUT dog - check dog id and req.user.id
router.put('/', (req, res) => {
  console.log('in api/dog PUT. Dog object to update is:', req.body);
  // response: 200 - OK
});

module.exports = router;
