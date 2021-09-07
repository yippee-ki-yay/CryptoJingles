const mongoose = require('mongoose');

// set up the database
mongoose.connect('mongodb://localhost/jingles');

mongoose.connection.on('connected', () => {
  console.log('Connected to local jingles database');
});

const closeConnection = () => {
  mongoose.connection.close();
};

module.exports = {
  closeConnection,
};