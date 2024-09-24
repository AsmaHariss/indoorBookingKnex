const express = require('express');
const knex = require('../db/db'); // Import your knex instance
const router = express.Router();

// signUp courtAdmin
router.post('/courtAdmins', (req, res) => {
    console.log("Received POST request to /courtAdmins", req.body);
  const { first_name, last_name, phone, email, password } = req.body;
  if (!first_name || !last_name || !phone || !email || !password) {
    return res.status(400).send("all fields should be filled");
  }

  knex.raw('insert into "courtAdmins" (first_name, last_name, phone, email, password) values (?, ?, ?, ?, ?)', [first_name, last_name, phone, email, password])
    .then(() => {
      return knex.select().from('courtAdmins');
    })
    .then((courtAdmins) => {
      res.send(courtAdmins);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating user");
    });
});



// List courtAdmins
router.get('/courtAdmins', (req, res) => {
  knex.select().from('courtAdmins')
    .then((courtAdmins) => {
      res.send(courtAdmins);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching courtAdmins");
    });
});

module.exports = router;
