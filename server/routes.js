const router = require('express').Router();

require('./models/jingles.model');
const jingleCtrl = require('./controllers/jingles.controller');

router.get('/jingles/:owner', jingleCtrl.getJinglesForOwner);
router.get('/jingle/:jingleId', jingleCtrl.getJingle);
router.get('/jingles/pagination/:page/filter/:filter', jingleCtrl.getJingles);

module.exports = router;