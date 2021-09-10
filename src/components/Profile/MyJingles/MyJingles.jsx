import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import t from 'translate';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { getAllUserJinglesAction } from 'redux/actions/jingleActions';
import BoxLoader from '../../Decorative/BoxLoader';
import SingleJingle from '../../SingleJingle/SingleJingle';
import MessageBox from '../../Common/MessageBox/MessageBox';
import { MESSAGE_BOX_TYPES } from '../../../constants/general';
import EmptyState from '../../Common/EmptyState/EmptyState';

import './MyJingles.scss';

const MyJingles = ({
  address, isOwner,
  getAllUserJinglesAction, gettingAllUserJingles, gettingAllUserJinglesError,
  v0UserJingles, v1UserJingles, ogWrappedUserJingles, newWrappedUserJingles,
}) => {
  const history = useHistory();

  const allNonWrappedJingles = useMemo(() => (v0UserJingles && v1UserJingles ? [...v0UserJingles, ...v1UserJingles] : null), [v0UserJingles, v1UserJingles]);
  const hasNonWrappedJingles = useMemo(() => allNonWrappedJingles && allNonWrappedJingles.length > 0, [allNonWrappedJingles]);

  const hasJingles = useMemo(() => hasNonWrappedJingles || (ogWrappedUserJingles && ogWrappedUserJingles.length > 0) || (newWrappedUserJingles && newWrappedUserJingles.length > 0), [hasNonWrappedJingles, ogWrappedUserJingles, newWrappedUserJingles]);

  const allJingles = useMemo(() => {
    if (!hasJingles) return [];

    const ogWrappedUserJinglesArr = ogWrappedUserJingles || [];
    const newWrappedUserJinglesArr = newWrappedUserJingles || [];
    const allNonWrappedJinglesArr = allNonWrappedJingles || [];

    return [...ogWrappedUserJinglesArr, ...newWrappedUserJinglesArr, ...allNonWrappedJinglesArr];
  }, [hasJingles, allNonWrappedJingles, ogWrappedUserJingles, newWrappedUserJingles]);

  const center = useMemo(() => gettingAllUserJingles || gettingAllUserJinglesError || !hasJingles, [gettingAllUserJingles, gettingAllUserJinglesError, hasJingles]);

  const handleEmptyStateButtonClickCallback = useCallback(() => history.push('/compose'), [history]);

  useEffect(() => getAllUserJinglesAction(address), [getAllUserJinglesAction, address]);

  return (
    <div className={clsx('my-jingles-wrapper profile-tab-content-container', { center })}>
      <div className="profile-tab-content-wrapper">
        {
          gettingAllUserJingles ?
            (
              <div className="loader-wrapper">
                <BoxLoader />
                <div className="loader-message">
                  { isOwner ? t('common.getting_all_your_jingles') : t('common.getting_jingles') }
                </div>
              </div>
            )
            :
            gettingAllUserJinglesError ?
              <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{gettingAllUserJinglesError}</MessageBox>
              :
              hasJingles ?
                (
                  <div className="jingles-grid-wrapper">
                    { allJingles.map((jingle) => (<SingleJingle key={`${jingle.version}-${jingle.jingleId}`} {...jingle} />)) }
                  </div>
                )
                :
                (
                  <EmptyState
                    text={isOwner ? t('common.no_jingles') : t('common.no_jingles_some_user')}
                    buttonText={isOwner ? t('common.compose_your_first_jingle') : ''}
                    handleButtonClick={handleEmptyStateButtonClickCallback}
                  />
                )
        }
      </div>
    </div>
  );
};

MyJingles.defaultProps = {
  v0UserJingles: null,
  v1UserJingles: null,
  ogWrappedUserJingles: null,
  newWrappedUserJingles: null,
};

MyJingles.propTypes = {
  address: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,

  getAllUserJinglesAction: PropTypes.func.isRequired,
  gettingAllUserJingles: PropTypes.bool.isRequired,
  gettingAllUserJinglesError: PropTypes.string.isRequired,
  v0UserJingles: PropTypes.array,
  v1UserJingles: PropTypes.array,
  ogWrappedUserJingles: PropTypes.array,
  newWrappedUserJingles: PropTypes.array,
};

const mapStateToProps = ({ profile, jingle }) => ({
  isOwner: profile.isOwner,

  gettingAllUserJingles: jingle.gettingAllUserJingles,
  gettingAllUserJinglesError: jingle.gettingAllUserJinglesError,
  v0UserJingles: jingle.v0UserJingles,
  v1UserJingles: jingle.v1UserJingles,
  ogWrappedUserJingles: jingle.ogWrappedUserJingles,
  newWrappedUserJingles: jingle.newWrappedUserJingles,
});

const mapDispatchToProps = {
  getAllUserJinglesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyJingles);
