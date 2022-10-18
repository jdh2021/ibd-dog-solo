const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET medication - check dog_id and req.user.id
router.get('/:id', (req, res) => {
  console.log('in /api/medication GET by dog id.');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user id is:', req.user.id);
  console.log('Dog id to get medications by is:', req.params.id);
  if (req.isAuthenticated()) {
    const queryText = `SELECT "medication"."id", "medication"."name", 
                      "medication"."frequency", "medication"."dosage", 
                      "medication"."active", "medication"."created_at", "medication"."dog_id" FROM "medication" 
                      JOIN "dog" on "medication"."dog_id"="dog"."id"
                      JOIN "user" on "dog"."user_id"="user"."id"
                      WHERE "dog"."id" = $1 AND "user"."id" = $2
                      ORDER BY "active" DESC, "created_at" ASC;`;
    pool.query(queryText, [req.params.id, req.user.id]).then(result => {
      console.log('/medication GET success');
      res.send(result.rows); // array of medications
    }).catch(error => {
      console.log('Error in GET medication by dog_id:', error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403); // forbidden
  }
});

// POST medication - check dog_id and req.user.id
router.post('/', (req, res) => {
  console.log('in /api/medication POST. Medication object to post is:', req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user id is:', req.user.id);
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "medication" ("name", "dosage", "frequency", "dog_id") 
                      SELECT $1, $2, $3, $4
                      WHERE EXISTS (SELECT * FROM "dog"
                      JOIN "user" on "user"."id"="dog"."user_id"
                      WHERE "dog"."user_id" = $5 AND "dog"."id" = $6);`;
    let { name, dosage, frequency, dog_id } = req.body;
    pool.query(queryText, [name, dosage, frequency, dog_id, req.user.id, dog_id])
      .then(result => {
        console.log('/medication POST success');
        res.sendStatus(201); // Created
      }).catch(error => {
        console.log('Error in /api/medication POST:', error);
        res.sendStatus(500);
      });
  } else {
    // forbidden if not logged in
    res.sendStatus(403);
  }
});

// DELETE medication - check req.user.id
router.delete('/:id', (req, res) => {
  console.log('in /api/medication DELETE by id. Medication id to delete is:', req.params.id);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user id is:', req.user.id);
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "medication" USING "dog"
                      WHERE "medication"."id" = $1 AND "dog"."id"="medication"."dog_id" 
                      AND "dog"."user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id]).then(result => {
      console.log('/medication DELETE success');
      res.sendStatus(200); // OK
    }).catch(error => {
      console.log('Error in DELETE medication by medication id:', error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403); // forbidden
  }
});

// PUT medication - check dog_id and req.user.id
router.put('/:id', (req, res) => {
  console.log('in /api/medication PUT by id. Medication id to update is:', req.params.id);
  // response: 200 - OK
});

module.exports = router;
