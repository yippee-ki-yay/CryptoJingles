import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApprovingState, getIsApprovedReducerPropName } from '../../../../services/assetsService';
import { APPROVE_TYPES } from '../../../../constants/assets';
import { isAddressApprovedOnAssetAction } from '../../../../actions/assetsActions';
import { wrapJingleAction } from '../../../../actions/jingleActions';
import SingleJingle from '../../../SingleJingle/SingleJingle';

import './SingleJingleContentItem.scss';

const SingleJingleContentItem = ({
  jingle, approvingAsset, address, assetApproved,
  isAddressApprovedOnAssetAction, jingleWrapping, wrapJingleAction,
}) => {
  useEffect(() => {
    if (address) isAddressApprovedOnAssetAction('ETH', '', (Number.MAX_SAFE_INTEGER - 22240000).toString(), APPROVE_TYPES.WRAPPING);
  }, [address, isAddressApprovedOnAssetAction]);

  const buttonLabel = useMemo(() => {
    if (approvingAsset) return 'Approving';
    if (!assetApproved) return 'Approve';

    if (jingleWrapping) return 'Wrapping';

    return 'Wrap';
  }, [assetApproved, approvingAsset, jingleWrapping]);

  const handleJingleWrapCallback = useCallback(() => wrapJingleAction(jingle.jingleId), [jingle, wrapJingleAction]);

  return (
    <div className="single-jingle-content-item-wrapper">
      <SingleJingle {...jingle} />

      <div onClick={handleJingleWrapCallback} className="button">{buttonLabel}</div>
    </div>
  );
};

SingleJingleContentItem.defaultProps = {
  address: '',
  approvingAsset: false,
  assetApproved: false,
  jingleWrapping: false,
};

SingleJingleContentItem.propTypes = {
  jingle: PropTypes.object.isRequired,
  isAddressApprovedOnAssetAction: PropTypes.func.isRequired,
  wrapJingleAction: PropTypes.func.isRequired,
  address: PropTypes.string,
  approvingAsset: PropTypes.bool,
  assetApproved: PropTypes.bool,
  jingleWrapping: PropTypes.bool,
};

const mapStateToProps = (state, { jingle }) => {
  const { address } = state.app;
  const approvedPropName = getIsApprovedReducerPropName(APPROVE_TYPES.WRAPPING);

  // TODO - set to the wrapper token
  const assetData = state.assets['ETH']; //eslint-disable-line

  const singleWrappingJingle = state.jingle.wrappingJingles[jingle.id];
  const jingleWrapping = singleWrappingJingle ? singleWrappingJingle.wrapping : false;

  return ({
    approvingAsset: getApprovingState(state, 'ETH', APPROVE_TYPES.WRAPPING),
    assetApproved: assetData[approvedPropName],

    address,
    jingleWrapping,
  });
};

const mapDispatchToProps = { isAddressApprovedOnAssetAction, wrapJingleAction };

export default connect(mapStateToProps, mapDispatchToProps)(SingleJingleContentItem);
