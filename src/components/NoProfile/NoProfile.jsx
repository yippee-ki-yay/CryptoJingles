import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const NoProfile = ({ address }) => (
  <Redirect to={`/profile/${address}`} />
);

NoProfile.propTypes = { address: PropTypes.string.isRequired };

const mapStateToProps = ({ app }) => ({ address: app.address });

export default connect(mapStateToProps)(NoProfile);
