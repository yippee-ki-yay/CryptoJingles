const serverConfig = require('../../jingleImageGeneration/createConfigServer');
const createFileRenderer = require('../../jingleImageGeneration/createFileRenderer');
const mongoose = require('mongoose');
const Jingle = mongoose.model('Jingle');
const fs = require('fs');
const path = require('path');

module.exports.getJingleImageUrl = async (req, res) => {
  try {
    const jingleId = req.params.jingleId;
    const config = serverConfig.create(jingleId);

    if (!jingleId) {
      res.status(500).send('Invalid param');
      return;
    }

    const jingle = await Jingle.findOne({ jingleId });

    if (!jingle) {
      res.status(500).send('Jingle with that id has not yet been created.');
      return;
    }

    const fileName = `render_${jingleId}.png`;
    const pathToFile = path.resolve('../public');

    fs.stat(`${pathToFile}/${fileName}`, (err, data) => {
      const fileExists = typeof data === 'object';

      const url = `http://159.65.26.139/${fileName}`;

      if (fileExists) res.send(url);
      if (!fileExists) createFileRenderer(config, () => { res.send(url); });
    });
  } catch(err) {
    res.status(500).send(err);
  }
};
