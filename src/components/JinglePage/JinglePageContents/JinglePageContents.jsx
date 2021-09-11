import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JinglePageContentsVideo from './JinglePageContentsVideo/JinglePageContentsVideo';
import JinglePageContentsActions from './JinglePageContentsActions/JinglePageContentsActions';
import JinglePageContentsInfo from './JinglePageContentsInfo/JinglePageContentsInfo';

import './JinglePageContents.scss';

const JinglePageContents = () => (
  <div className="jingle-page-contents-wrapper">
    <div className="columns-wrapper">
      <div className="left-column-wrapper">
        <JinglePageContentsVideo />
        <JinglePageContentsActions />
      </div>

      <div className="right-column-wrapper">
        <JinglePageContentsInfo />
      </div>
    </div>
  </div>
);

JinglePageContents.propTypes = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(JinglePageContents);
