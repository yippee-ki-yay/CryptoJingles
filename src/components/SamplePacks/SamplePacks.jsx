import React from 'react';
import SamplePack from '../SamplePack/SamplePack';
import { getSamplePacks } from '../../constants/getMockData';

import './SamplePacks.scss';

const SamplePacks = () => (
  <div className="container sample-packs-wrapper">
    <div className="sample-packs-header">
      <h4>Sample packs</h4>
    </div>

    <div className="packs-list-wrapper">
      {
        getSamplePacks().map(samplePack => (
          <SamplePack key={samplePack.name} samplePack={samplePack} />
        ))
      }
    </div>
  </div>
);

export default SamplePacks;
