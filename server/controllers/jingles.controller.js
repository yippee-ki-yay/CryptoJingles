const mongoose = require('mongoose');
const Jingle = mongoose.model('Jingle');

const JINGLES_PER_PAGE = 10;

module.exports.getJinglesForOwner = async (req, res) => {

    const pageNum = parseInt(req.params.page) - 1;
    const filter = req.params.filter;

    try {
        const jingles = await Jingle.find({owner: req.params.owner})
                                    .limit(JINGLES_PER_PAGE)
                                    .skip(JINGLES_PER_PAGE * pageNum)
                                    .sort(filter)
                                    .exec();

        res.status(200);
        res.json(jingles);

    } catch(err) {
        console.log(err);
    }
}

module.exports.getJinglesOnSaleForOwner = async (req, res) => {

    const pageNum = parseInt(req.params.page) - 1;
    const filter = req.params.filter;

    try {
        const jingles = await Jingle.find({owner: req.params.owner, onSale: true})
                                    .limit(JINGLES_PER_PAGE)
                                    .skip(JINGLES_PER_PAGE * pageNum)
                                    .sort(filter)
                                    .exec();

        res.status(200);
        res.json(jingles);

    } catch(err) {
        console.log(err);
    }
}

module.exports.getJingleNumForOwner = async (req, res) => {
    try {
        const sale = req.params.sale;

        let search = { owner: req.params.owner };

        if (sale === 'true') {
            search = { 
                onSale: true,
                owner: req.params.owner
            };
        }

        const num = await Jingle.count(search).exec();

        res.status(200);
        res.json(num);

    } catch(err) {
        console.log(err);
    }  
}

module.exports.getJingle = async (req, res) => {
    try {
        const jingleId = req.params.jingleId;

        const jingle = await Jingle.findOne({jingleId: jingleId});

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

module.exports.getJingleNum = async (req, res) => {
    try {
        const sale = req.params.sale;

        let search = {};

        if (sale === 'true') {
            search = { onSale: true};
        }

        const num = await Jingle.count(search).exec();

        res.status(200);
        res.json(num);

    } catch(err) {
        console.log(err);
    }  
}

module.exports.getJinglesForSale = async (req, res) => {
    try {

        const pageNum = parseInt(req.params.page) - 1;
        const filter = req.params.filter;

        console.log('Getting orders', pageNum, filter);

        const orders = await Jingle.find({onSale: true})
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

        const find = await Jingle.find({jingleId: jingleData.jingleId});

        if (!find) {
            const jingle = new Jingle(jingleData);

            await jingle.save();
    
            return true;
        }

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

module.exports.removeFromSale = async (jingleId, buyer) => {
    try {
        const jingle = await Jingle.findOne({jingleId: jingleId});

        jingle.onSale = false;
        jingle.price = 0;
        jingle.owner = buyer;

        await jingle.save();

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }
}