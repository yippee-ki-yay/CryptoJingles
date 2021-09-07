import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import t from 'translate';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import { getApprovingState, getIsApprovedReducerPropName } from 'services/assetsService';
import { isAddressApprovedOnAssetAction } from '../../../../actions/assetsActions';
import { clearWrapAction, wrapJingleAction } from '../../../../actions/jingleActions';
import SingleJingle from '../../../SingleJingle/SingleJingle';
import MessageBox from '../../../Common/MessageBox/MessageBox';

import './WrapJinglesContentJingleItem.scss';

const WrapJinglesContentJingleItem = ({
  jingle, approveAddress, approveKey, assetSymbol, wrapKey,
  isAddressApprovedOnAssetAction, assetApproved, approvingAsset,
  wrapJingleAction, clearWrapAction, jingleWrapping, jingleWrappingError, isOg,
}) => {
  const buttonLabel = useMemo(() => {
    if (approvingAsset) return isOg ? t('jingles.approving_og_wrapper') : t('jingles.approving_new_wrapper');
    if (!assetApproved) return isOg ? t('jingles.approve_og_wrapper') : t('jingles.approve_new_wrapper');

    if (jingleWrapping) return isOg ? t('jingles.wrapping_with_og_wrapper') : t('jingles.wrapping_with_new_wrapper');

    return isOg ? t('jingles.wrap_with_og_wrapper') : t('jingles.wrap_with_new_wrapper');
  }, [assetApproved, approvingAsset, jingleWrapping, isOg]);

  const disabled = useMemo(() => jingleWrapping || approvingAsset, [jingleWrapping, approvingAsset]);

  const handleJingleWrapCallback = useCallback(() => wrapJingleAction(jingle.jingleId, jingle.version, assetApproved, approveAddress, approveKey, assetSymbol, wrapKey, isOg), [jingle, wrapJingleAction, assetApproved, approveAddress, approveKey, assetSymbol, wrapKey, isOg]);

  const clearWrapActionCallback = useCallback(() => clearWrapAction(jingle.jingleId, jingle.version, wrapKey), [jingle, wrapKey, clearWrapAction]);

  useEffect(() => {
    isAddressApprovedOnAssetAction(assetSymbol, approveAddress, jingle.jingleId, approveKey);
  }, [jingle, isAddressApprovedOnAssetAction, approveAddress, assetSymbol, approveKey]);

  useEffect(() => () => { clearWrapActionCallback(); }, [clearWrapActionCallback]);

  return (
    <div className="wrap-jingles-content-jingle-item-wrapper">
      <SingleJingle {...jingle} />

      <button
        type="button"
        onClick={handleJingleWrapCallback}
        className="button green"
        disabled={disabled}
      >
        {buttonLabel}
      </button>

      {
        jingleWrappingError && (<MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{ jingleWrappingError }</MessageBox>)
      }
    </div>
  );
};

WrapJinglesContentJingleItem.defaultProps = {
  address: '',
  approvingAsset: false,
  assetApproved: false,
  isOg: false,
};

WrapJinglesContentJingleItem.propTypes = {
  jingle: PropTypes.object.isRequired,
  isAddressApprovedOnAssetAction: PropTypes.func.isRequired,
  wrapJingleAction: PropTypes.func.isRequired,
  clearWrapAction: PropTypes.func.isRequired,
  jingleWrapping: PropTypes.bool.isRequired,
  jingleWrappingError: PropTypes.string.isRequired,
  approveAddress: PropTypes.string.isRequired,
  assetSymbol: PropTypes.string.isRequired,
  approveKey: PropTypes.string.isRequired,
  wrapKey: PropTypes.string.isRequired,
  address: PropTypes.string,
  approvingAsset: PropTypes.bool,
  assetApproved: PropTypes.bool,
  isOg: PropTypes.bool,
};

const mapStateToProps = (state, { jingle, approveType }) => {
  const assetSymbol = `JINGLE_V${jingle.version}`;
  const approveKey = approveType(jingle.jingleId);
  const approvedPropName = getIsApprovedReducerPropName(approveKey);

  const assetData = state.assets[assetSymbol]; //eslint-disable-line

  const wrapKey = `v${jingle.version}-${jingle.jingleId}`;
  const singleWrappingJingle = state.jingle.wrappingJingles[wrapKey];
  const jingleWrapping = singleWrappingJingle ? singleWrappingJingle.wrapping : false;
  const jingleWrappingError = singleWrappingJingle ? singleWrappingJingle.error : '';

  return ({
    approvingAsset: getApprovingState(state, assetSymbol, approveKey),
    assetApproved: assetData[approvedPropName],

    jingleWrapping,
    jingleWrappingError,

    assetSymbol,
    approveKey,
    wrapKey,
  });
};

const mapDispatchToProps = { isAddressApprovedOnAssetAction, wrapJingleAction, clearWrapAction };

export default connect(mapStateToProps, mapDispatchToProps)(WrapJinglesContentJingleItem);
