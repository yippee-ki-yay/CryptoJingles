import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import {
  purchaseJingleAction,
  clearPurchaseJingleAction,
} from 'redux/actions/singleJingleActions';
import { formatSalePrice } from '../../../../actions/utils';
import MessageBox from '../../../Common/MessageBox/MessageBox';

import './JinglePageContentsActions.scss';

const JinglePageContentsActions = ({
  singleJingle, address, reducerKey,
  purchaseJingleAction, clearPurchaseJingleAction, purchasing, purchasingError,
}) => {
  const v1OnSale = useMemo(() => singleJingle.onSale && singleJingle.version === 1, [singleJingle]);
  const v1OnSaleAndAddressLoaded = useMemo(() => v1OnSale && address, [address, v1OnSale]);
  const v1NotOnSaleAndAddressLoaded = useMemo(() => singleJingle.version === 1 && !singleJingle.onSale && address, [address, singleJingle]);
  const v1OnSaleAndAddressLoadedNotOwner = useMemo(() => v1OnSaleAndAddressLoaded && address.toLowerCase() !== singleJingle.realOwner, [v1OnSaleAndAddressLoaded, address, singleJingle]);

  // cancel sale
  const v1OnSaleAndAddressLoadedOwner = useMemo(() => v1OnSaleAndAddressLoaded && address.toLowerCase() === singleJingle.realOwner, [v1OnSaleAndAddressLoaded, address, singleJingle]);

  // put on sale
  const v1ONotOnSaleAddressLoadedOwner = useMemo(() => v1NotOnSaleAndAddressLoaded && address.toLowerCase() === singleJingle.owner, [v1NotOnSaleAndAddressLoaded, address, singleJingle]);

  // PURCHASE
  const purchaseJingleActionCallback = useCallback(() => {
    purchaseJingleAction(singleJingle.version, singleJingle.id, singleJingle.price, reducerKey);
  }, [purchaseJingleAction, singleJingle, reducerKey]);

  const clearPurchaseJingleActionCallback = useCallback(() => {
    clearPurchaseJingleAction(reducerKey);
  }, [clearPurchaseJingleAction, reducerKey]);

  useEffect(() => () => {
    clearPurchaseJingleActionCallback();
  }, [clearPurchaseJingleActionCallback]);

  return (
    <div className="jingle-page-contents-actions-wrapper">
      {
        singleJingle.onSale && (
          <div className="sell-price-wrapper">
            <span className="price-title">Sell price:</span>
            <span className="price-value">{ formatSalePrice(singleJingle.price) }Ξ</span>
          </div>
        )
      }

      {
        v1OnSaleAndAddressLoadedNotOwner && (
          <div className="purchase-wrapper">
            <button
              type="button"
              className="button green"
              onClick={purchaseJingleActionCallback}
              disabled={purchasing}
            >
              { purchasing ? 'Purchasing' : 'Purchase' }
            </button>

            { purchasingError && (<MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{purchasingError}</MessageBox>) }
          </div>
        )
      }
    </div>
  );
};

JinglePageContentsActions.propTypes = {
  address: PropTypes.string.isRequired,
  reducerKey: PropTypes.string.isRequired,
  singleJingle: PropTypes.object.isRequired,

  purchaseJingleAction: PropTypes.func.isRequired,
  clearPurchaseJingleAction: PropTypes.func.isRequired,
  purchasing: PropTypes.bool.isRequired,
  purchasingError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ singleJingle, app }) => {
  const { singleJingle: jingle } = singleJingle;

  const reducerKey = `${jingle.version}-${jingle.id}`;

  const purchasingItem = singleJingle.purchasingJingle[reducerKey];
  const purchasing = purchasingItem ? purchasingItem.purchasing : false;
  const purchasingError = purchasingItem ? purchasingItem.error : '';

  return {
    address: app.address,
    singleJingle: jingle,
    reducerKey,

    purchasing,
    purchasingError,
  };
};

const mapDispatchToProps = { purchaseJingleAction, clearPurchaseJingleAction };

export default connect(mapStateToProps, mapDispatchToProps)(JinglePageContentsActions);
