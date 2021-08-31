import React, { Component } from 'react';
import createLoop from 'raf-loop';
import PropTypes from 'prop-types';
import createConfig from '../../../jingleImageGeneration/createConfigClient';
import createRenderer from '../../../jingleImageGeneration/createRenderer';

import './JingleImage.scss';

// Uncomment this if you want to resize the canvas
// const letterbox = (element, parent) => {
//   let aspect = element.width / element.height;
//   let pwidth = parent.offsetWidth;
//   let pheight = parent.offsetHeight;
//
//   let width = pwidth;
//   let height = Math.round(width / aspect);
//   let y = Math.floor(pheight - height) / 2;
//
//   element.style.top = y + 'px';
//   element.style.width = width + 'px';
//   element.style.height = height + 'px';
// };

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

  // componentWillUnmount() {
  //   document.addEventListener('resize', this.resize.bind(this));
  // }

  // resize() {
  //   letterbox(this.canvas, this.canvasWrapper);
  // }

  reload(config) {
    const { canvas } = this;
    const background = new window.Image();
    const context = canvas.getContext('2d');
    const loop = createLoop();

    loop.removeAllListeners('tick');
    loop.stop();

    const opts = {
      ...config,
      backgroundImage: background,
      context,
      width: this.props.width,
      height: this.props.height,
    };

    const pixelRatio = typeof opts.pixelRatio === 'number' ? opts.pixelRatio : 1;
    canvas.width = opts.width * pixelRatio;
    canvas.height = opts.height * pixelRatio;

    this.canvasWrapper.style.background = opts.palette[0]; // eslint-disable-line

    const capturer = new CCapture({ format: 'webm' });

    background.onload = () => {
      const renderer = createRenderer(opts);
      renderer.clear();

      let stepCount = 0;

      loop.on('tick', () => {
        renderer.step(opts.interval);
        capturer.capture(canvas);
        stepCount += 1;
        if (!opts.endlessBrowser && stepCount > opts.steps) {
          loop.stop();
          capturer.stop();
          capturer.save();
        }
      });

      loop.start();
      capturer.start();
    };

    background.src = config.backgroundSrc;
  }

  render() {
    return (
      <div className="jingle-image-wrapper" ref={(ref) => { this.canvasWrapper = ref; }}>
        <canvas ref={(ref) => { this.canvas = ref; }} />
      </div>
    );
  }
}

JingleImage.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default JingleImage;
