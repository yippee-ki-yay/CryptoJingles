const mongoose = require('mongoose');

const wrappedJingleSchema = new mongoose.Schema({
  wrappedId: { type: Number, required: true },
  jingleVersion: { type: String, required: true },
  jingleId: { type: Number, required: true },
});

mongoose.model('WrappedJingle', wrappedJingleSchema);
