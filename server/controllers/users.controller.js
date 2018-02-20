const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.setNumSamplesBought = async (address, numSamples) => {

    try {

        const user = await User.findOne({ethAddress: address});

        if (user) {
            user.numSamplesBought += parseInt(numSamples);
            await user.save();

        } else {
            const newUser = new User({ethAddress: address, numSamplesBought: parseInt(numSamples)});
            await newUser.save();
        }

    } catch(err) {
        console.log(err);
    }

};

module.exports.addUser = async (address) => {
    try {

        const user = await User.findOne({ethAddress: address});


        const newUser = new User({ethAddress: address});
        await newUser.save();


    } catch(err) {
        console.log(err);
    }
};

module.exports.userExists = async (address) => {
    try {

        const user = await User.findOne({ethAddress: address});

        if (user) {
            return true;
        } else {
            return false;
        }

    } catch(err) {
        console.log(err);
    }
}