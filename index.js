const express = require('express');
const app = express();
const userRoutes = require('./routes/userDetailsRoute');
const courtAdminRoutes = require('./routes/courtAdminRoute');
const superAdminRoutes = require('./routes/superAdminRoute');
const courtRoutes = require('./routes/courtRoute');
const bookingRoutes = require('./routes/bookingRoute');
const registrationRoutes = require('./routes/registrationRoute');

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send("Hello there");
});

//routes
app.use('/api', userRoutes); 
app.use('/api', courtAdminRoutes);
app.use('/api', superAdminRoutes);
app.use('/api', courtRoutes);
app.use('/api', bookingRoutes);
app.use('/api', registrationRoutes);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
