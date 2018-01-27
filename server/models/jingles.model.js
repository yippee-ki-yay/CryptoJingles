const mongoose = require('mongoose');

const jingleSchema = new mongoose.Schema({
    jingleId: {type: Number, required: true},
    owner: {type: String, required: true},
    samples: {type: Array, required: true},
    time: {type: Date, default: Date.now},
});

mongoose.model('Jingle', jingleSchema);