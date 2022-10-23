const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data and dog. Password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  console.log('in api/user/register POST');
  console.log('Req.body is:', req.body);
  const client = await pool.connect();
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const dogName = req.body.name;
  const dogBirthday = req.body.birthday;
  try {
    await client.query('BEGIN');
    const queryText = `INSERT INTO "user" (username, password)
                      VALUES ($1, $2) RETURNING "id";`;
    let response = await pool.query(queryText, [username, password])
     // creating user id
    const userId = response.rows[0].id;
    console.log('User id is:', userId);
    await pool.query( `INSERT INTO "dog" ("name", "birthday", "food", "user_id", "image")
                      VALUES($1, $2, $3, $4, $5);`, [dogName, dogBirthday, '', userId, '']);
    // commit if queries succeed
    await client.query('COMMIT');
    res.sendStatus(201); //created
  } catch (error) {
    console.log('User registration failed: ', error);
    await client.query('ROLLBACK');
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
