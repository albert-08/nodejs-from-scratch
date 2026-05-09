const mongoose = require('mongoose');
const { db } = require('../config');

const connection = mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = connection;