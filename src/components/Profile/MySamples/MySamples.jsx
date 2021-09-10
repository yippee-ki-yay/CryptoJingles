import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import t from 'translate';
import clsx from 'clsx';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import { getUserSamplesAction } from 'redux/actions/jingleActions';
import BoxLoader from '../../Decorative/BoxLoader';
import BuySamples from '../../Common/BuySamples/BuySamples';
import MessageBox from '../../Common/MessageBox/MessageBox';
import SampleBox2 from '../../SampleBox/SampleBox2';
import EmptyState from '../../Common/EmptyState/EmptyState';

import './MySamples.scss';

const MySamples = ({
  getUserSamplesAction, address, isOwner, userSamples,
  gettingUserSamples, gettingUserSamplesError,
}) => {
  const hasSamples = useMemo(() => userSamples && userSamples.length > 0, [userSamples]);
  const center = useMemo(() => gettingUserSamples || gettingUserSamplesError || !hasSamples, [gettingUserSamples, gettingUserSamplesError, hasSamples]);

  useEffect(() => { getUserSamplesAction(address); }, [address, getUserSamplesAction]);

  return (
    <div className={clsx('my-samples-wrapper profile-tab-content-container', { center })}>
      { isOwner && (<BuySamples />) }

      <div className="profile-tab-content-wrapper">
        {
          gettingUserSamples ?
            (
              <div className="loader-wrapper">
                <BoxLoader />
                <div className="loader-message">
                  { isOwner ? t('common.getting_all_your_samples') : t('common.getting_samples') }
                </div>
              </div>
            )
            :
            gettingUserSamplesError ?
              <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{gettingUserSamplesError}</MessageBox>
              :
              hasSamples ?
                (
                  <div className="samples-grid-container">
                    { userSamples.map((sample) => (<SampleBox2 key={sample.id} {...sample} />)) }
                  </div>
                )
                :
                (<EmptyState text={isOwner ? t('common.no_samples') : t('common.no_samples_some_user')} />)
        }
      </div>
    </div>
  );
};

MySamples.defaultProps = {
  userSamples: null,
};

MySamples.propTypes = {
  address: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  getUserSamplesAction: PropTypes.func.isRequired,

  userSamples: PropTypes.array,
  gettingUserSamples: PropTypes.bool.isRequired,
  gettingUserSamplesError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ profile, jingle }) => ({
  isOwner: profile.isOwner,

  gettingUserSamples: jingle.gettingUserSamples,
  gettingUserSamplesError: jingle.gettingUserSamplesError,
  userSamples: jingle.userSamples,
});

const mapDispatchToProps = {
  getUserSamplesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySamples);
