import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PackImage extends Component {
  componentDidMount() {
    // const config = {
    //   colorMode: 'color',
    //   compositeOperation: 'lighten',
    //   iterationLimit: 0,
    //   key: 'low',
    //   lineWidth: 2,
    //   lineMode: 'smooth',
    //   origin: ['bottom'],
    //   outputSize: 'original',
    //   pathFinderCount: 30,
    //   speed: 7,
    //   turningAngle: Math.PI
    // };

    const chromata = new Chromata(this.image);
    chromata.start();
  }

  render() {
    return <img className="pack-image" src={this.props.image} alt="Pack cover" ref={(ref) => { this.image = ref; }} />;
  }
}

PackImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default PackImage;
