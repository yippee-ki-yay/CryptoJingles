const router = require('express').Router();

require('./models/purchase.model');
const purchaseCtrl = require('./controllers/purchase.controller');

require('./models/jingles.model');
const jingleCtrl = require('./controllers/jingles.controller');

router.get('/purchase', purchaseCtrl.getPurchases);

module.exports = router;