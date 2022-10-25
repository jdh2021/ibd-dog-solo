const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET dog - check req.user.id
router.get('/', (req, res) => {
  console.log('in /api/dog GET by user id. user id is:', req.user.id);
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "dog" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id]).then(result => {
      res.send(result.rows[0]); // single dog object
    }).catch(error => {
      console.log('Error in /api/dog GET:', error);
      res.sendStatus(500);
    });
  } else {
    // forbidden if not logged in
    res.sendStatus(403);
  }
});

// PUT dog - check dog id and req.user.id
router.put('/', (req, res) => {
  console.log('in /api/dog PUT. Dog object to update is:', req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user id is:', req.user.id);
  if (req.isAuthenticated()) {
    const queryText =   `UPDATE "dog" SET "name" = $1,
                        "birthday" = $2, "food" = $3, "image" = $4
                        WHERE "id" = $5 and "user_id" = $6;`;
    let { name, birthday, food, image, id } = req.body;
    pool.query(queryText, [name, birthday, food, image, id, req.user.id])
      .then(result => {
        console.log('/dog PUT success');
        res.sendStatus(200); // OK
      }).catch(error => {
        console.log('Error in /api/dog PUT:', error);
        res.sendStatus(500);
      });
  } else {
    // forbidden if not logged in
    res.sendStatus(403);
  }
});

module.exports = router;
