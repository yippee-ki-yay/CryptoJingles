const mongoose = require('mongoose');

const jingleSchema = new mongoose.Schema({
    jingleId: {type: Number, required: true},
    name: {type: String},
    author: {type: String},
    price: {type: Number},
    onSale: {type: Boolean},
    owner: {type: String, required: true},
    samples: {type: Array, required: true},
    sampleTypes: {type: Array, required: true},
    time: {type: Date, default: Date.now},
    settings: {type: Array},
    likeCount: {type: Number, default: 0, required: true},
    likes: [{ type: String, required: true }],
    hasWebm: {type: Boolean, default: false}
});

mongoose.model('Jingle', jingleSchema);
