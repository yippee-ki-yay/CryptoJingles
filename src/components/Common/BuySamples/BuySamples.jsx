import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import { buySamplesAction, clearBuySamplesAction, setNumSamplesToBuyAction } from '../../../actions/profileActions';
import MessageBox from '../MessageBox/MessageBox';

import './BuySamples.scss';

// TODO - Add tx button here
const BuySamples = ({
  setNumSamplesToBuyAction, numSamplesToBuy,
  buySamplesAction, clearBuySamplesAction, buyingSamples, buyingSamplesError,
}) => {
  const setNumSamplesToBuyActionCallback = useCallback(({ target }) => { setNumSamplesToBuyAction(target); }, [setNumSamplesToBuyAction]);

  useEffect(() => () => { clearBuySamplesAction(); }, [clearBuySamplesAction]);

  return (
    <div className="buy-samples-wrapper">
      <div className="title-form-wrapper">
        <h2>Buy samples:</h2>

        <form className="form-wrapper form-horizontal" onSubmit={(e) => { e.preventDefault(); }}>
          <input
            name="numJinglesToBuy"
            value={numSamplesToBuy}
            disabled={buyingSamples}
            onChange={setNumSamplesToBuyActionCallback}
            type="number"
            placeholder="Num. of Jingles"
          />

          <button
            type="submit"
            className="button buy"
            onClick={buySamplesAction}
            disabled={buyingSamples}
          >
            { buyingSamples ? 'Buying' : 'Buy!' }
          </button>
        </form>
      </div>

      { buyingSamplesError && <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{ buyingSamplesError }</MessageBox> }
    </div>
  );
};

BuySamples.propTypes = {
  setNumSamplesToBuyAction: PropTypes.func.isRequired,
  numSamplesToBuy: PropTypes.number.isRequired,
  buySamplesAction: PropTypes.func.isRequired,
  clearBuySamplesAction: PropTypes.func.isRequired,
  buyingSamples: PropTypes.bool.isRequired,
  buyingSamplesError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  numSamplesToBuy: profile.numSamplesToBuy,
  buyingSamples: profile.buyingSamples,
  buyingSamplesError: profile.buyingSamplesError,
});

const mapDispatchToProps = {
  setNumSamplesToBuyAction,
  buySamplesAction,
  clearBuySamplesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuySamples);
