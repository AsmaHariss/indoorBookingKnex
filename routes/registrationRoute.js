const express = require('express');
const knex = require('../db/db'); 
const router = express.Router();

// add registration
router.post('/registration', (req, res) => {
    console.log("Received POST request to /registrations", req.body);
  const { court_name, sport_name, location, user_id, status } = req.body;
  if (!court_name || !sport_name || !location || !user_id || !status) {
    return res.status(400).send("all fields should be filled");
  }

  knex.raw('insert into "registrations" (court_name, sport_name, location, user_id, status) values (?,?,?,?,?)', [court_name, sport_name, location, user_id, status])
    .then(() => {
      return knex.select().from('registrations');
    })
    .then((registrations) => {
      res.send(registrations);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating registration");
    });
});

//list registration
router.get('/registration', (req, res) => {
  knex.select().from('registrations')
    .then((registrations) => {
      res.send(registrations);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching registration");
    });
});

//update booking
router.put('/registration', (req, res) => {
  const {id, court_name, sport_name, location, user_id, status } = req.body;

  if (!id) {
    return res.status(400).send("ID is required.");
  }

  const updateData = {};
  if (court_name) updateData.court_name = court_name;
  if (sport_name) updateData.sport_name = sport_name;
  if (location) updateData.location = location;
  if (user_id) updateData.user_id = user_id;
  if (status) updateData.status = status;

  knex('registrations').where('id', id).update(updateData)
    .then(() => {
      return knex.select().from('registrations');
    })
    .then((registrations) => {
      res.send(registrations);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error updating registration");
    });
});

//delete registration
router.delete('/registration', (req, res) => {
  const { id } = req.body; 
  if (!id) {
      return res.status(400).send("ID is required.");
  }
  knex('registrations').where('id', id).del()
      .then(() => {
          return knex.select().from('registrations'); 
      })
      .then((registrations) => {
          res.send(registrations);
      })
      .catch((error) => {
          console.error(error);
          res.status(500).send("Error deleting registration");
      });
});


module.exports = router;