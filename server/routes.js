const router = require('express').Router();

require('./models/order.model');
const orderCtrl = require('./controllers/order.controller');

require('./models/jingles.model');
const jingleCtrl = require('./controllers/jingles.controller');

router.get('/orders', orderCtrl.getOrders);
router.get('/orders/pagination/:page/filter/:filter', orderCtrl.getOrders);

router.get('/jingles/:owner', jingleCtrl.getJinglesForOwner);
router.get('/jingle/:jingleId', jingleCtrl.getJingle);

module.exports = router;