import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import {
  setJingleSalePriceAction,
  sellJingleAction,
  clearSellJingleAction,
} from 'redux/actions/singleJingleActions';
import MessageBox from '../../../../Common/MessageBox/MessageBox';

import './JinglePageContentsActionsSellForm.scss';

const JinglePageContentsActionsSellForm = ({
  singleJingle, reducerKey,
  setJingleSalePriceAction, jingleSalePrice,
  sellJingleAction, clearSellJingleAction, selling, sellingError,
}) => {
  const submitDisabled = useMemo(() => {
    if (selling || !jingleSalePrice) return true;

    return parseFloat(jingleSalePrice) <= 0;
  }, [selling, jingleSalePrice]);

  const submitCallback = useCallback((e) => e.preventDefault(), []);

  const setJingleSalePriceActionCallback = useCallback(({ target }) => {
    setJingleSalePriceAction(target.value, reducerKey);
  }, [setJingleSalePriceAction, reducerKey]);

  const sellJingleActionCallback = useCallback(() => {
    sellJingleAction(singleJingle.version, singleJingle.id, reducerKey);
  }, [sellJingleAction, singleJingle, reducerKey]);

  const clearSellJingleActionCallback = useCallback(() => { clearSellJingleAction(reducerKey); }, [reducerKey, clearSellJingleAction]);

  useEffect(() => () => { clearSellJingleActionCallback(); }, [clearSellJingleActionCallback]);

  return (
    <div className="jingle-page-contents-actions-sell-form-wrapper">
      <form onSubmit={submitCallback}>
        <input
          className="form-input"
          placeholder="Sell price in ETH"
          type="number"
          step="any"
          disabled={selling}
          value={jingleSalePrice}
          onChange={setJingleSalePriceActionCallback}
        />

        <button
          type="submit"
          className="button green"
          disabled={submitDisabled}
          onClick={sellJingleActionCallback}
        >
          { selling ? 'Putting on sale' : 'Put on sale' }
        </button>
      </form>

      { sellingError && (<MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{sellingError}</MessageBox>) }
    </div>
  );
};

JinglePageContentsActionsSellForm.propTypes = {
  singleJingle: PropTypes.object.isRequired,
  reducerKey: PropTypes.string.isRequired,

  jingleSalePrice: PropTypes.string.isRequired,
  setJingleSalePriceAction: PropTypes.func.isRequired,

  sellJingleAction: PropTypes.func.isRequired,
  clearSellJingleAction: PropTypes.func.isRequired,
  selling: PropTypes.bool.isRequired,
  sellingError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ singleJingle }, { reducerKey }) => {
  const { singleJingle: jingle } = singleJingle;

  const jingleSalePrice = singleJingle.jingleSalePrices[reducerKey] || '';

  const sellingItem = singleJingle.sellingJingle[reducerKey];
  const selling = sellingItem ? sellingItem.selling : false;
  const sellingError = sellingItem ? sellingItem.error : '';

  return ({
    singleJingle: jingle,
    jingleSalePrice,

    selling,
    sellingError,
  });
};

const mapDispatchToProps = {
  setJingleSalePriceAction,
  sellJingleAction,
  clearSellJingleAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(JinglePageContentsActionsSellForm);
