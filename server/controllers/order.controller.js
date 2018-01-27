const mongoose = require('mongoose');
const Order = mongoose.model('Order');

const ORDERS_PER_PAGE = 10;

module.exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});

        res.status(200);
        res.json(orders);

    } catch(err) {
        console.log(err);
    }
}

module.exports.getOrders = async (req, res) => {
    try {

        const pageNum = parseInt(req.params.page) - 1;
        const filter = req.params.filter;

        console.log('Getting orders', pageNum, filter);

        const orders = await Order.find({})
                                  .limit(ORDERS_PER_PAGE)
                                  .skip(ORDERS_PER_PAGE * pageNum)
                                  .sort(filter)
                                  .exec();

        res.status(200);
        res.json(orders);

    } catch(err) {
        console.log(err);
    }
}

// Server only method not exposed in api
module.exports.addOrder = async (orderData) => {
    try {
        const order = new Order(orderData);

        await order.save();

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports.removeOrder = async (jingleId) => {
    try {

        await Order.find({jingleId: jingleId}).remove().exec();

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }
}