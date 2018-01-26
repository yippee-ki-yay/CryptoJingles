const router = require('express').Router();

require('./purchase.model');
const purchaseCtrl = require('./purchase.controller');

router.get('/purchase', purchaseCtrl.getPurchases);

module.exports = router;