import React from 'react';
import PropTypes from 'prop-types';
import { getJingleMetadata } from '../../constants/getMockData';

import './SamplePack.scss';

const SamplePack = ({ samplePack }) => (
  <div className="sample-pack-wrapper">
    <div className="pack-info">
      <div className="pack-name">{ samplePack.name }</div>
      <div className="pack-description">{ samplePack.description }</div>

      <div className="samples-list">
        {
          samplePack.samples.map((type) => {
            const sample = getJingleMetadata(type);
            return (
              <span key={type} className="sample">{ sample.name }</span>
            );
          })
        }
      </div>
    </div>

    <div className="button-wrapper">
      <div className="button">
        <span className="button__mask" />
        <span className="button__text">Purchase</span>
        <span className="button__text button__text--bis">Purchase</span>
      </div>
    </div>
  </div>
);

SamplePack.propTypes = {
  samplePack: PropTypes.object.isRequired,
};

export default SamplePack;
