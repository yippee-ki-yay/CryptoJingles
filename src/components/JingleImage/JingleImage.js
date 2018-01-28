import React, { Component } from 'react';
import createLoop from 'raf-loop';
import createConfig from './config';
import createRenderer  from './createRenderer';

import './JingleImage.css';

// TODO - add proptypes
class JingleImage extends Component {
  constructor(props) {
    super(props);

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload(createConfig(this.props.id));

    // document.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    // document.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    console.log('12322');
    this.letterbox(this.canvas, [ this.canvasWrapper.innerWidth, this.canvasWrapper.innerHeight ]);
  }

  static letterbox(element, parent) {
    let aspect = element.width / element.height;
    let pwidth = parent[0];
    let pheight = parent[1];

    let width = pwidth;
    let height = Math.round(width / aspect);
    let y = Math.floor(pheight - height) / 2;

    element.style.top = y + 'px';
    element.style.width = width + 'px';
    element.style.height = height + 'px';
  }

  reload(config) {
    let canvas = this.canvas;
    let background = new window.Image();
    let context = canvas.getContext('2d');
    let loop = createLoop();

    loop.removeAllListeners('tick');
    loop.stop();

    let opts = {
      ...config,
      backgroundImage: background,
      context: context,
      width: 200,
      height: 200,
      // seedName: this.props.id
    };

    console.log('opts', opts);

    var pixelRatio = typeof opts.pixelRatio === 'number' ? opts.pixelRatio : 1;
    canvas.width = opts.width * pixelRatio;
    canvas.height = opts.height * pixelRatio;

    this.canvasWrapper.style.background = opts.palette[0];
    // seedText.textContent = opts.seedName;

    background.onload = () => {
      var renderer = createRenderer(opts);

      if (opts.debugLuma) {
        renderer.debugLuma();
      } else {
        renderer.clear();
        var stepCount = 0;
        loop.on('tick', () => {
          renderer.step(opts.interval);
          stepCount++;
          if (!opts.endlessBrowser && stepCount > opts.steps) {
            loop.stop();
          }
        });
        loop.start();
      }
    };

    background.src = config.backgroundSrc;
  }

  render() {
    return (
      <div className="jingle-image-wrapper" ref={(ref) => this.canvasWrapper = ref}>
        <canvas ref={(ref) => this.canvas = ref} />
      </div>
    )
  }
}

export default JingleImage;

