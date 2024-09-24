const express = require('express');
const knex = require('../db/db'); 
const router = express.Router();

// add court
router.post('/courts', (req, res) => {
    console.log("Received POST request to /courts", req.body);
  const { court_name, sport_name, location } = req.body;
  if (!court_name || !sport_name || !location) {
    return res.status(400).send("all fields should be filled");
  }

  knex.raw('insert into courts (court_name, sport_name, location) values (?, ?,?)', [court_name, sport_name, location])
    .then(() => {
      return knex.select().from('courts');
    })
    .then((courts) => {
      res.send(courts);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating court");
    });
});

//delete court
router.delete('/courts', (req, res) => {
    const { id } = req.body; 
    if (!id) {
        return res.status(400).send("User ID is required.");
    }
    knex('courts').where('id', id).del()
        .then(() => {
            return knex.select().from('courts'); 
        })
        .then((courts) => {
            res.send(courts);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error deleting court");
        });
});

//list court
router.get('/courts', (req, res) => {
    knex.select().from('courts')
      .then((courts) => {
        res.send(courts);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error fetching courts");
      });
  });

  //update courts
  router.put('/courts', (req, res) => {
    const { id, court_name, sport_name, location } = req.body;
  
    if (!id) {
      return res.status(400).send("ID is required.");
    }
  
    const updateData = {};
    if (court_name) updateData.court_name = court_name;
    if (sport_name) updateData.sport_name = sport_name;
    if (location) updateData.location = location;
  
    knex('courts').where('id', id).update(updateData)
      .then(() => {
        return knex.select().from('courts');
      })
      .then((courts) => {
        res.send(courts);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error updating court");
      });
  });

  module.exports = router;