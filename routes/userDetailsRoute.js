const express = require('express');
const knex = require('../db/db'); // Import your knex instance
const router = express.Router();

// signUp courtAdmin
router.post('/userDetails', (req, res) => {
    console.log("Received POST request to /userDetails", req.body);
  const { first_name, last_name, phone, email, password } = req.body;
  if (!first_name || !last_name || !phone || !email || !password) {
    return res.status(400).send("all fields should be filled");
  }

  knex.raw('insert into "userDetails" (first_name, last_name, phone, email, password) values (?, ?, ?, ?, ?)', [first_name, last_name, phone, email, password])
    .then(() => {
      return knex.select().from('userDetails');
    })
    .then((userDetails) => {
      res.send(userDetails);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating user");
    });
});



// List userDetails
router.get('/userDetails', (req, res) => {
  knex.select().from('userDetails')
    .then((userDetails) => {
      res.send(userDetails);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching userDetails");
    });
});

module.exports = router;
