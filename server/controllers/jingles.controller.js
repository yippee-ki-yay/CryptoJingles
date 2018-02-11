const mongoose = require('mongoose');
const Jingle = mongoose.model('Jingle');

const JINGLES_PER_PAGE = 10;

module.exports.getJinglesForOwner = async (req, res) => {

    const pageNum = parseInt(req.params.page) - 1;
    const filter = req.params.filter;

    try {
        const jingles = await Jingle.find({owner: req.params.owner}, '-likes')
                                    .limit(JINGLES_PER_PAGE)
                                    .skip(JINGLES_PER_PAGE * pageNum)
                                    .sort(filter)
                                    .exec();

        res.status(200);
        res.json(jingles);

    } catch(err) {
        console.log(err);
    }
};

module.exports.getJinglesOnSaleForOwner = async (req, res) => {

    const pageNum = parseInt(req.params.page) - 1;
    const filter = req.params.filter;

    try {
        const jingles = await Jingle.find({owner: req.params.owner, onSale: true}, '-likes')
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

        const jingle = await Jingle.findOne({jingleId: jingleId}, '-likes');

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

        const orders = await Jingle.find({}, '-likes')
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

        const orders = await Jingle.find({onSale: true}, '-likes')
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

module.exports.getOnSaleJingles = async () => {
    try {

        const jinglesOfSale = await Jingle.find({onSale: true}, '-likes').select('jingleId');

        return jinglesOfSale;

    } catch(err) {
        console.log(err);
    }
}

// Server only method not exposed in api
module.exports.addJingle = async (jingleData) => {
    try {

        const find = await Jingle.findOne({jingleId: parseInt(jingleData.jingleId)});

        console.log('Found jingle', find);

        if (!find) {
            const jingle = new Jingle(jingleData);

            await jingle.save();

            console.log('Saved jingle', jingleData.jingleId);

            return true;
        }

    } catch(err) {
        console.log(err);
        console.log('ERROR WHILE SAVING JINGLE', jingleData.jingleId, err);
        return false;
    }
};

module.exports.jingleNum = async () => {
    try {
        const numJingles = Jingle.find({}).count();

        return numJingles;
    } catch(err) {
        console.log(err);
    }
};

module.exports.setForSale = async (order) => {
    try {
        console.log("Id: ", order.jingleId);

        const jingle = await Jingle.findOne({jingleId: order.jingleId});

        if(!jingle) {
            return;
        }

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
        jingle.buyer = buyer;

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
        jingle.buyer = buyer;

        await jingle.save();

        return true;

    } catch(err) {
        console.log(err);
        return false;
    }
}
module.exports.cancelJingle = async (jingleId) => {
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
};

/**
 * Based on action, increments or deduces a jingles likeCount.
 * Likes are limited to a user address that has at least bought 5 samples.
 *
 * TODO - implement limit to user that has bought at least 5 samples
 *
 * @param {Number} jingleId
 * @param {String} address
 * @param {Boolean} action - true = like, false = dislike
 * @return {Promise}
 */
const updateLikeUnlikeJingle = (jingleId, address, action) =>
  new Promise (async (resolve, reject) => {
    const jingle = await Jingle.findOne({ jingleId });

    if ((action === true) && jingle.likes.includes(address)) {
      reject('Already performed this action.');
      return;
    }

    if ((action === false) && !jingle.likes.includes(address)) {
      reject('Jingle was not liked prior to this action.');
      return;
    }

    jingle.likeCount = action ? jingle.likeCount + 1 : jingle.likeCount - 1;

    if (action === true) jingle.likes.push(address);
    if (action === false) {
      const likes = jingle.likes.slice();
      likes.splice(likes.findIndex(_address => _address === address), 1);
      jingle.likes = likes;
    }

    console.log('jingle.likes', jingle.likes);

    await jingle.save();
    resolve(jingle.likeCount);
  });

// TODO - format and separate error code and message
/**
 * Updates jingles likeCount if params are present
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Boolean} action - true = like, false = dislike
 */
module.exports.likeUnLikeJingle = async (req, res, action) => {
  const { jingleId, address } = req.body;

  if (!address || !jingleId) {
    res.status(500).send({ error: 'Invalid params' });
    return;
  }

  try {
    const likeCount = await updateLikeUnlikeJingle(jingleId, address, action);
    res.send({ likeCount });
  } catch(error) {
    res.status(500).send({ error });
  }
};
