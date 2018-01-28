import React, { Component } from 'react';
import createLoop from 'raf-loop';
import createConfig from './config';
import createRenderer  from './createRenderer';

import './JingleImage.css';

const letterbox = (element, parent) => {
  let aspect = element.width / element.height;
  let pwidth = parent.offsetWidth;
  let pheight = parent.offsetHeight;

  let width = pwidth;
  let height = Math.round(width / aspect);
  let y = Math.floor(pheight - height) / 2;

  element.style.top = y + 'px';
  element.style.width = width + 'px';
  element.style.height = height + 'px';
};

// TODO - add proptypes
class JingleImage extends Component {
  constructor(props) {
    super(props);

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload(createConfig(this.props.id));
    // this.resize();

    // document.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    // document.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    letterbox(this.canvas, this.canvasWrapper);
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
      width: this.props.width,
      height: this.props.height
    };

    let pixelRatio = typeof opts.pixelRatio === 'number' ? opts.pixelRatio : 1;
    canvas.width = opts.width * pixelRatio;
    canvas.height = opts.height * pixelRatio;

    this.canvasWrapper.style.background = opts.palette[0];

    background.onload = () => {
      let renderer = createRenderer(opts);

      if (opts.debugLuma) {
        renderer.debugLuma();
      } else {
        renderer.clear();
        let stepCount = 0;
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

