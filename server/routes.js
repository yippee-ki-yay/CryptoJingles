const router = require('express').Router();

require('./models/jingles.model');
const jingleCtrl = require('./controllers/jingles.controller');

const wrappedJingleCtrl = require('./controllers/wrappedJingles.controller');

require('./models/jinglesV0.model');
const jingleV0Ctrl = require('./controllers/jinglesV0.controller');
// const jingleImageCtrl = require('./controllers/jingle.image.controller');

router.get('/wrapped-jingle/:jingleId', wrappedJingleCtrl.getWrappedJingle);

router.get('/jingles/pagination/:owner/page/:page/filter/:filter', jingleCtrl.getJinglesForOwner);
router.get('/jingles/count/owner/:owner/sale/:sale', jingleCtrl.getJingleNumForOwner);
router.get('/jingles/sale/:owner/page/:page/filter/:filter', jingleCtrl.getJinglesOnSaleForOwner);
router.get('/jingle/:jingleId', jingleCtrl.getJingle);
router.get('/jingles/pagination/:page/filter/:filter', jingleCtrl.getJingles);
router.get('/jingles/sale/:page/filter/:filter', jingleCtrl.getJinglesForSale);
router.get('/jingles/count/filter/:filter/sale/:sale', jingleCtrl.getJingleNum);

router.post('/jingle/like', (req, res) => { jingleCtrl.likeUnLikeJingle(req, res, true); });
router.post('/jingle/unlike', (req, res) => { jingleCtrl.likeUnLikeJingle(req, res, false); });
router.get('/jingle/can-like/:address', jingleCtrl.canLikeJingle);
router.get('/jingles/check-liked/:address/:jingleIds', jingleCtrl.checkIfLikedJingles);
router.get('/jingle/check-liked/:address/:jingleId', jingleCtrl.checkIfLikedJingle);

// V0
router.get('/jingles/v0/pagination/:owner/page/:page/filter/:filter', jingleV0Ctrl.getJinglesForOwner);
router.get('/jingles/v0/count/owner/:owner/sale/:sale', jingleV0Ctrl.getJingleNumForOwner);
router.get('/jingles/v0/sale/:owner/page/:page/filter/:filter', jingleV0Ctrl.getJinglesOnSaleForOwner);
router.get('/jingle/v0/:jingleId', jingleV0Ctrl.getJingle);
router.get('/jingles/v0/pagination/:page/filter/:filter', jingleV0Ctrl.getJingles);
router.get('/jingles/v0/sale/:page/filter/:filter', jingleV0Ctrl.getJinglesForSale);
router.get('/jingles/v0/count/filter/:filter/sale/:sale', jingleV0Ctrl.getJingleNum);

module.exports = router;
