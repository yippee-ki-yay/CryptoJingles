const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');

module.exports.getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({});

        res.status(200);
        res.json(purchases);

    } catch(err) {
        console.log(err);
    }
}