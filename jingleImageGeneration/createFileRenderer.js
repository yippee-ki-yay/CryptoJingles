const mapLimit = require('map-limit');
const newArray = require('new-array');
const Canvas = require('canvas');
const Image = Canvas.Image;
const padLeft = require('pad-left');
const assign = require('object-assign');
const jsdom = require("jsdom");
const tar = require("tar");
const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const pngFileStream = require('png-file-stream');

const { JSDOM } = jsdom;

const path = require('path');
const createRenderer = require('./createRenderer');
const fs = require('fs');

module.exports = function (opt, cb) {
  const { window } = new JSDOM(
    `
    <body>
        <script src="https://unpkg.com/ccapture.js@1.1.0/build/CCapture.all.min.js"></script>
        <canvas id='animation' width='250' height='250'></canvas>
    </body>
    `,
    // We need these options to allow JSDOM to require CCapture from node_modules
    { runScripts: "dangerously", resources: "usable" }
  );

  const document = window.document;

  // Do our stuff after DOM is ready.
  window.onload = () => {
    const canvas = createCanvas(250, 250);

    let renderer;
    const pixelRatio = typeof opt.pixelRatio === 'number' ? opt.pixelRatio : 1;
    const context = canvas.getContext('2d');

    const steps = opt.steps;
    const frameDigits = String(steps).length;
    const seedName = typeof opt.seedName !== 'undefined' ? ('_' + opt.seedName) : '';
    const filename = (opt.filename || 'render') + seedName;
    const outputDir = opt.outputDir || process.cwd();
    let frame = 0;
    const interval = typeof opt.interval === 'number' ? opt.interval : 0.0001;
    const cwd = opt.cwd || process.cwd();

    fs.readFile(path.resolve(cwd, opt.backgroundSrc), (err, buffer) => {
      if (err) return cb(err);
      const backgroundImage = new Image();
      backgroundImage.src = buffer;

      const debugLuma = opt.debugLuma;
      const asVideoFrames = opt.asVideoFrames;

      renderer = createRenderer(assign(opt, {
        backgroundImage: backgroundImage,
        context: context
      }));

      // let capturer = new window.CCapture({ format: 'png', name: filename });
      const encoder = new GIFEncoder(250, 250);
      encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

      encoder.start();
      encoder.setRepeat(-1);   // 0 for repeat, -1 for no-repeat
      encoder.setDelay(0.1);  // frame delay in ms
      encoder.setQuality(20); // image quality. 10 is default.

      // capturer.start();

      if (debugLuma) {
        renderer.debugLuma();
        outputCanvas();
      } else {
        if (asVideoFrames) renderAsync();
        else render(encoder, context);
      }
    });

    function render (_encoder) {
      renderer.clear();
      for (let i = 0; i < steps + 1; i++) {
        const newContext = renderer.step(interval);
        // _capturer.capture(canvas);
        _encoder.addFrame(newContext);

        frame++;
      }

      _encoder.finish();
      // _capturer.stop();

      // Now clearing the interval, stopping capturer

      // setTimeout(() => {
      //   clearInterval(interval);
      //
      //   _capturer.stop();
      //
      //   // Saving the file using FileReader (from JSDOM) and node.js API
      //   _capturer.save(blob => {
      //     const reader = new window.FileReader();
      //     reader.onload = () => {
      //       const arrayBuffer = reader.result;
      //       const uint8Array = new Uint8Array(arrayBuffer);
      //       console.log('uint8Array', reader.result);
      //
      //       // fs.mkdirSync("./images");
      //       // fs.writeFileSync("./images/group.tar", uint8Array, { encoding: "binary" });
      //       //
      //       // try {
      //       //   fs.createReadStream("./images/group.tar").pipe(tar.extract({ cwd: './images/' }));
      //       // } catch (err) {
      //       //   console.log('err', err);
      //       // }
      //
      //       // Sync for simplicity
      //
      //
      //       const encoder = new GIFEncoder(250, 250);
      //       const stream = pngFileStream('./images/*.png')
      //         .pipe(encoder.createWriteStream({ repeat: 0, delay: 1, quality: 10 }))
      //         .pipe(fs.createWriteStream('./images/myanimated.gif'));
      //
      //       // stream.on('finish', resolve);
      //       stream.on('error', (err) => { console.log('err', err); });
      //     };
      //
      //     reader.readAsArrayBuffer(blob);
      //   });
      // }, 4000);

      // outputCanvas(false, cb);
    }

    function renderAsync () {
      renderer.clear();

      const array = newArray(steps);
      mapLimit(array, 1, (item, next) => {
        renderer.step(interval);
        outputCanvas(true, next);
        frame++;
      }, (err) => {
        if (err) throw err;
      });
    }

    function outputCanvas (isAsync, cb) {
      // const stamp = isAsync ? ('_' + padLeft(frame, frameDigits, '0')) : '';
      // const filePath = path.resolve(outputDir, filename + stamp + '.png');
      // fs.writeFile(filePath, canvas.toBuffer(), cb);
    }
  }
};
