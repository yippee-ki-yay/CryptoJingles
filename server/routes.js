const router = require('express').Router();

require('./models/jingles.model');
const jingleCtrl = require('./controllers/jingles.controller');

router.get('/jingles/pagination/:owner/page/:page/filter/:filter', jingleCtrl.getJinglesForOwner);
router.get('/jingles/count/owner/:owner/sale/:sale', jingleCtrl.getJingleNumForOwner);
router.get('/jingles/sale/:owner/page/:page/filter/:filter', jingleCtrl.getJinglesOnSaleForOwner);
router.get('/jingle/:jingleId', jingleCtrl.getJingle);
router.get('/jingles/pagination/:page/filter/:filter', jingleCtrl.getJingles);
router.get('/jingles/sale/:page/filter/:filter', jingleCtrl.getJinglesForSale);
router.get('/jingles/count/filter/:filter/sale/:sale', jingleCtrl.getJingleNum);

router.post('/jingle/like', (req, res) => { jingleCtrl.likeUnLikeJingle(req, res, true); });
router.post('/jingle/unlike', (req, res) => { jingleCtrl.likeUnLikeJingle(req, res, false); });
router.get('/jingles/check-liked/:address/:jingleIds', jingleCtrl.checkIfLikedJingles);
router.get('/jingle/check-liked/:address/:jingleId', jingleCtrl.checkIfLikedJingle);

module.exports = router;