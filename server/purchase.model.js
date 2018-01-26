const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    jingleId: {type: Number, required: true},
    seller: {type: String, required: true},
    price: {type: Number, required: true},
    time: {type: Date, default: Date.now},
});

  mongoose.model('Purchase', purchaseSchema);