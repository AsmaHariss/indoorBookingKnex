const express = require('express');
const knex = require('../db/db'); 
const router = express.Router();

// add booking
router.post('/booking', (req, res) => {
    console.log("Received POST request to /booking", req.body);
  const { court_name, sport_name, start_time, end_time, user_id, court_id } = req.body;
  if (!court_name || !sport_name || !start_time || !end_time || !user_id || !court_id) {
    return res.status(400).send("all fields should be filled");
  }

  knex.raw('insert into "booking" (court_name, sport_name, start_time, end_time, user_id, court_id) values (?,?,?,?,?,?)', [court_name, sport_name, start_time, end_time, user_id, court_id])
    .then(() => {
      return knex.select().from('booking');
    })
    .then((booking) => {
      res.send(booking);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating booking");
    });
});

//list booking
router.get('/booking', (req, res) => {
  knex.select().from('booking')
    .then((booking) => {
      res.send(booking);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching booking");
    });
});

//update booking
router.put('/booking', (req, res) => {
  const { id, court_name, sport_name, start_time, end_time,user_id, court_id } = req.body;

  if (!id) {
    return res.status(400).send("ID is required.");
  }

  const updateData = {};
  if (court_name) updateData.court_name = court_name;
  if (sport_name) updateData.sport_name = sport_name;
  if (start_time) updateData.start_time = start_time;
  if (end_time) updateData.end_time = end_time;
  if (user_id) updateData.user_id = user_id;
  if (court_id) updateData.court_id = court_id;

  knex('booking').where('id', id).update(updateData)
    .then(() => {
      return knex.select().from('booking');
    })
    .then((booking) => {
      res.send(booking);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error updating booking");
    });
});


//delete booking
router.delete('/booking', (req, res) => {
  const { id } = req.body; 
  if (!id) {
      return res.status(400).send("ID is required.");
  }
  knex('booking').where('id', id).del()
      .then(() => {
          return knex.select().from('booking'); 
      })
      .then((booking) => {
          res.send(booking);
      })
      .catch((error) => {
          console.error(error);
          res.status(500).send("Error deleting booking");
      });
});

module.exports = router;