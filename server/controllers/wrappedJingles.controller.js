const mongoose = require('mongoose');

const WrappedJingle = mongoose.model('WrappedJingle');
const JingleV0 = mongoose.model('JingleV0');
const Jingle = mongoose.model('Jingle');

module.exports.removeWrappedJingle = async (wrappedId, jingleVersion, jingleId) => {
  try {
    const find = await WrappedJingle.findOneAndDelete({ wrappedId });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addWrappedJingle = async (wrappedId, jingleVersion, jingleId) => {
  try {
    const find = await WrappedJingle.findOne({ wrappedId });

    if (!find) {
      await find.save();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.getWrappedJingleMetadata = async (req, res) => {
  try {
    const { wrappedId } = req.params;

    const wrappedJingle = await WrappedJingle.findOne({ wrappedId });

    const metadata = {};

    if (wrappedJingle) {
      let jingleData;

      if (wrappedJingle.jingleVersion === 'v0') {
        jingleData = await JingleV0.findOne({ jingleId: wrappedJingle.jingleId });
      } else {
        jingleData = await Jingle.findOne({ jingleId: wrappedJingle.jingleId });
      }

      const base = 'https://cryptojingle.me/';

      const webmName = `${wrappedJingle.jingleVersion}_${jingleData.jingleId}`;

      metadata.description = 'This is a wrapped jingle';
      metadata.name = `${jingleData.name}`;
      metadata.animation_url = `${base}/public/videosWithSound/${webmName}`;
      metadata.external_url = `${base}/jingle/${jingleData.jingleId}`;
      metadata.image = `${base}/public/videosWithSound/${webmName}`;
      metadata.attributes = {};
    }

    res.status(200);
    res.json(metadata);
  } catch (err) {
    console.log(err);
  }
};