import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import t from 'translate';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import BoxLoader from '../../Decorative/BoxLoader';
import MessageBox from '../MessageBox/MessageBox';

import './LoadingErrorOverlay.scss';

const LoadingErrorOverlay = ({ loading, error, loadingText }) => (
  <div className={clsx('loading-error-overlay-wrapper', { error })}>
    {
      loading && (
        <div className="loader-wrapper">
          <BoxLoader />
          { loadingText && (<div className="loader-message">{ t(loadingText) }</div>) }
        </div>
      )
    }
    { error && (<MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{ error }</MessageBox>) }
  </div>
);

LoadingErrorOverlay.defaultProps = {
  loadingText: '',
};

LoadingErrorOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
};

export default LoadingErrorOverlay;
