const Canvas = require('canvas');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { createCanvas } = require('canvas');
const Whammy = require('./whamy');
const createRenderer = require('./createRenderer');

const { Image } = Canvas;

const canvasToWebp = (canvas) => new Promise((resolve, reject) => {
  try {
    sharp(canvas.toBuffer()).toFormat(sharp.format.webp).toBuffer((e, webpbuffer) => {
      if (e) return reject(e);

      const webpDataURL = `data:image/webp;base64,${webpbuffer.toString('base64')}`;
      resolve(webpDataURL);
    });
  } catch (err) {
    reject(err);
  }
});

/**
 * Adds frame based on the version
 *
 * @param context
 * @param fileData
 */
const addFrameImage = (context, fileData) => {
  const img = new Canvas.Image(); // Create a new Image
  img.src = fileData;

  // Initialiaze a new Canvas with the same dimensions
  // as the image, and get a 2D drawing context for it.
  context.drawImage(img, 0, 0, img.width, img.height);
};

/**
 * Creates the new webm files from the steps iterations
 *
 * @param _encoder
 * @param _renderer
 * @param _steps
 * @param _interval
 * @param _fileName
 * @param _version
 * @param _addFrame
 * @param _cb
 */
const render = async (_encoder, _renderer, _steps, _interval, _fileName, _version, _addFrame, _cb) => {
  const promises = [];

  const frameFileData = _addFrame ? fs.readFileSync(_version === 0 ? './frames/gold.png' : './frames/silver.png') : null;

  _renderer.clear();

  for (let i = 0; i < _steps + 1; i += 1) {
    const newContext = _renderer.step(_interval);

    if (_addFrame) addFrameImage(newContext, frameFileData);

    promises.push(canvasToWebp(newContext.canvas));
  }

  const frames = await Promise.all(promises);
  frames.map((frame) => _encoder.add(frame));

  const output = _encoder.compile(true);
  fs.writeFileSync(`./videos/${_fileName}.webm`, output, { encoding: 'binary' });

  _cb(null, true);
};

module.exports = function (opt, cb) {
  const {
    steps, fileName, addFrame, version,
  } = opt;

  const canvas = createCanvas(250, 250);
  const context = canvas.getContext('2d');

  const interval = typeof opt.interval === 'number' ? opt.interval : 0.0001;
  const cwd = opt.cwd || process.cwd();

  // Loads the background src from the config and starts the renderer
  fs.readFile(path.resolve(cwd, opt.backgroundSrc), (err, buffer) => {
    if (err) return cb(err);

    const backgroundImage = new Image();
    backgroundImage.src = buffer;

    const renderer = createRenderer({ ...opt, backgroundImage, context });
    const encoder = new Whammy.Video(60, 10);

    render(encoder, renderer, steps, interval, fileName, version, addFrame, cb);
  });
};
