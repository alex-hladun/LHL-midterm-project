/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//  ROUTES TO /api/users
const express = require('express');
const router  = express.Router();
const database = require('../server/database.js');


// This is what LightBNB was using:
// module.exports = function(router, database) {

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/login", (req, res) => {
    // Function to find user_id for given email
    console.log('REQ QUERY', req.query);
    const userEmail = req.query.user_email;
    console.log(userEmail);

    database.getUserWithEmail(db, userEmail)
      .then(user => {
        console.log(user.id);
        res.cookie('user_id', user.id);
        res.redirect('http://localhost:8080/');
      });

    // Assign a cookie for the user_id we just looked up.
  })

  return router;
};
