const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET symptom - check dog_id and req.user.id
router.get('/:id', (req, res) => {
  console.log('in /api/symptom GET by dog id.');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user id is:', req.user.id);
  console.log('Dog id to get records by is:', req.params.id);
  if(req.isAuthenticated()){
    const queryText = `SELECT "symptom"."id", "symptom"."appetite", "symptom"."energy", 
                      "symptom"."stomach_pain", "symptom"."vomit", "symptom"."diarrhea", 
                      "symptom"."med_given", "symptom"."score", "symptom"."dog_id" FROM "symptom"
                      JOIN "dog" on "symptom"."dog_id"="dog"."id"
                      JOIN "user" on "dog"."user_id"="user"."id"
                      WHERE "dog"."id" = $1 AND "user"."id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id]).then(result => {
      console.log('/symptom GET success');
      res.send(result.rows); // array of symptom records
  }).catch(error => {
    console.log('Error in GET record(s) by dog_id:', error);
    res.sendStatus(500);
  })
  } else {
    res.sendStatus(403); // forbidden
  }
});

// POST symptom - check dog_id and req.user.id
router.post('/', (req, res) => {
  console.log('in /api/symptom POST. Symptom object to post is:', req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user id is:', req.user.id);
  // convert values from CheckIn to numbers and add to get health score
  req.body.score =  Number(req.body.appetite) + Number(req.body.energy) + Number(req.body.stomach_pain) + 
                    Number(req.body.vomit) + Number(req.body.diarrhea);
  console.log('Score is:', req.body.score);
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "symptom" ("appetite", "energy", "stomach_pain", "vomit", 
                      "diarrhea", "med_given", "score", "dog_id") 
                      SELECT $1, $2, $3, $4, $5, $6, $7, $8
                      WHERE EXISTS (SELECT * FROM "dog"
                      JOIN "user" on "user"."id"="dog"."user_id"
                      WHERE "dog"."user_id" = $9 AND "dog"."id" = $10);`;
    let { appetite, energy, stomach_pain, vomit, diarrhea, med_given, score, dog_id } = req.body;
    pool.query(queryText, [appetite, energy, stomach_pain, vomit, diarrhea, med_given, score, dog_id, req.user.id, dog_id])
      .then(result => {
        console.log('/symptom POST success');
        res.sendStatus(201); // Created
      }).catch(error => {
        console.log('Error in /api/symptom POST:', error);
        res.sendStatus(500);
      });
  } else {
    // forbidden if not logged in
    res.sendStatus(403);
  }
});

// DELETE symptom - check dog_id and req.user.id
router.delete('/:id', (req, res) => {
  console.log('in /api/symptom DELETE. Symptom id to delete is:', req.params.id);
  // response: 200 - OK
});

// PUT symptom - check dog_id and req.user.id
router.put('/', (req, res) => {
  console.log('in /api/symptom PUT. Symptom object to update is:', req.body);
  // response: 200 - OK
});

module.exports = router;
