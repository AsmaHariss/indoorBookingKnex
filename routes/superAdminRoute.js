const express = require('express');
const knex = require('../db/db'); // Import your knex instance
const router = express.Router();

// signUp courtAdmin
router.post('/superAdmins', (req, res) => {
    console.log("Received POST request to /superAdmins", req.body);
  const { first_name, last_name, phone, email, password } = req.body;
  if (!first_name || !last_name || !phone || !email || !password) {
    return res.status(400).send("all fields should be filled");
  }

  knex.raw('insert into "superAdmins" (first_name, last_name, phone, email, password) values (?, ?, ?, ?, ?)', [first_name, last_name, phone, email, password])
    .then(() => {
      return knex.select().from('superAdmins');
    })
    .then((superAdmins) => {
      res.send(superAdmins);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating user");
    });
});



// List superAdmins
router.get('/superAdmins', (req, res) => {
  knex.select().from('superAdmins')
    .then((superAdmins) => {
      res.send(superAdmins);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching superAdmins");
    });
});

module.exports = router;
