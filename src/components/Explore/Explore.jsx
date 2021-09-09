import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Explore.scss';

const Explore = () => (
  <div className="explore-page-wrapper page-wrapper">
    <div className="width-container">Explore</div>
  </div>
);

Explore.propTypes = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Explore);
