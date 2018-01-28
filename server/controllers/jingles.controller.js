const mongoose = require('mongoose');
const Jingle = mongoose.model('Jingle');

const JINGLES_PER_PAGE = 10;

module.exports.getJinglesForOwner = async (req, res) => {
    try {
        const jingles = await Jingle.find({owner: req.params.owner});

        console.log(jingles);

        res.status(200);
        res.json(jingles);

    } catch(err) {
        console.log(err);
    }
}

module.exports.getJingle = async (req, res) => {
    try {
        const jingleId = req.params.jingleId;

        const jingle = await Jingle.find({jingleId: jingleId});

        console.log(jingle);

        res.status(200);
        res.json(jingle);

    } catch(err) {
        console.log(err);
    }
}

module.exports.getJingles = async (req, res) => {
    try {

        const pageNum = parseInt(req.params.page) - 1;
        const filter = req.params.filter;

        console.log('Getting orders', pageNum, filter);

        const orders = await Jingle.find({})
                                  .limit(JINGLES_PER_PAGE)
                                  .skip(JINGLES_PER_PAGE * pageNum)
                                  .sort(filter)
                                  .exec();

        res.status(200);
        res.json(orders);

    } catch(err) {
        console.log(err);
    }
}

// Server only method not exposed in api
module.exports.addJingle = async (jingleData) => {
    try {
        const jingle = new Jingle(jingleData);

        await jingle.save();

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports.setForSale = async (order) => {
    try {
        console.log("Id: ", order.jingleId);

        const jingle = await Jingle.findOne({jingleId: order.jingleId});

        jingle.onSale = true;
        jingle.price = order.price;

        await jingle.save();

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports.removeFromSale = async (jingleId) => {
    try {
        const jingle = await Jingle.findOne({jingleId: jingleId});

        jingle.onSale = false;
        jingle.price = 0;

        await jingle.save();

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }
}