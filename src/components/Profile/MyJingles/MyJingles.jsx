import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import t from 'translate';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { clearAllUserJinglesAction, getAllUserJinglesAction } from 'redux/actions/jingleActions';
import BoxLoader from '../../Decorative/BoxLoader';
import SingleJingle from '../../SingleJingle/SingleJingle';
import MessageBox from '../../Common/MessageBox/MessageBox';
import { MESSAGE_BOX_TYPES } from '../../../constants/general';
import EmptyState from '../../Common/EmptyState/EmptyState';

import './MyJingles.scss';

const MyJingles = ({
  address, isOwner,
  getAllUserJinglesAction, gettingAllUserJingles, gettingAllUserJinglesError,
  allUserJingles, clearAllUserJinglesAction,
}) => {
  const history = useHistory();

  const hasJingles = useMemo(() => allUserJingles && allUserJingles.length > 0, [allUserJingles]);
  const center = useMemo(() => gettingAllUserJingles || gettingAllUserJinglesError || !hasJingles, [gettingAllUserJingles, gettingAllUserJinglesError, hasJingles]);

  const handleEmptyStateButtonClickCallback = useCallback(() => history.push('/compose'), [history]);

  useEffect(() => getAllUserJinglesAction(address), [getAllUserJinglesAction, address]);
  useEffect(() => () => { clearAllUserJinglesAction(); }, [clearAllUserJinglesAction]);

  console.log('allUserJingles', allUserJingles);

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
                    { allUserJingles.map((jingle) => (<SingleJingle key={`${jingle.version}-${jingle.jingleId}`} {...jingle} />)) }
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
  allUserJingles: null,
};

MyJingles.propTypes = {
  address: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,

  getAllUserJinglesAction: PropTypes.func.isRequired,
  clearAllUserJinglesAction: PropTypes.func.isRequired,
  gettingAllUserJingles: PropTypes.bool.isRequired,
  gettingAllUserJinglesError: PropTypes.string.isRequired,
  allUserJingles: PropTypes.array,
};

const mapStateToProps = ({ profile, jingle }) => ({
  isOwner: profile.isOwner,

  gettingAllUserJingles: jingle.gettingAllUserJingles,
  gettingAllUserJinglesError: jingle.gettingAllUserJinglesError,
  allUserJingles: jingle.allUserJingles,
});

const mapDispatchToProps = {
  getAllUserJinglesAction,
  clearAllUserJinglesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyJingles);
