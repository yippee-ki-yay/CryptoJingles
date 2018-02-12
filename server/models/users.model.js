const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    numSamplesBought: {type: Number},
    ethAddress: {type: String}
});

mongoose.model('User', userSchema);