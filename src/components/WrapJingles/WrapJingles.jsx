import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import t from 'translate';
import { useHistory } from 'react-router-dom';
import { getAllUserJinglesAction } from 'redux/actions/jingleActions';
import { MESSAGE_BOX_TYPES } from '../../constants/general';
import WrapJinglesContent from './WrapJinglesContent/WrapJinglesContent';
import MessageBox from '../Common/MessageBox/MessageBox';
import EmptyState from '../Common/EmptyState/EmptyState';

import BoxLoader from '../Decorative/BoxLoader';
import './WrapJingles.scss';

const WrapJingles = ({
  getAllUserJinglesAction, gettingAllUserJingles,
  gettingAllUserJinglesError, v0UserJingles, v1UserJingles, address,
  ogWrappedUserJingles, newWrappedUserJingles,
}) => {
  const history = useHistory();

  const allNonWrappedJingles = useMemo(() => (v0UserJingles && v1UserJingles ? [...v0UserJingles, ...v1UserJingles] : null), [v0UserJingles, v1UserJingles]);
  const hasNonWrappedJingles = useMemo(() => allNonWrappedJingles && allNonWrappedJingles.length > 0, [allNonWrappedJingles]);

  const hasJingles = useMemo(() => hasNonWrappedJingles || (ogWrappedUserJingles && ogWrappedUserJingles.length > 0) || (newWrappedUserJingles && newWrappedUserJingles.length > 0), [hasNonWrappedJingles, ogWrappedUserJingles, newWrappedUserJingles]);

  const center = useMemo(() => gettingAllUserJingles || gettingAllUserJinglesError || !hasJingles, [gettingAllUserJingles, gettingAllUserJinglesError, hasJingles]);

  const handleEmptyStateButtonClickCallback = useCallback(() => history.push('/compose'), [history]);

  useEffect(() => getAllUserJinglesAction(address), [getAllUserJinglesAction, address]);

  return (
    <div className={clsx('wrap-jingle-wrapper page-wrapper', { center })}>
      <div className="width-container">
        <div className="page-header-wrapper">
          <div className="page-title">{ t('jingles.wrap_jingles') }</div>
          <div className="page-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi beatae cupiditate deserunt id impedit incidunt natus necessitatibus obcaecati odio odit porro quibusdam recusandae rem repellat repellendus reprehenderit, suscipit voluptate!</div>
        </div>

        <div className="page-content-wrapper">
          {
            gettingAllUserJingles ?
              (
                <div className="loader-wrapper">
                  <BoxLoader />
                  <div className="loader-message">{ t('common.getting_all_your_jingles') }</div>
                </div>
              )
              :
              gettingAllUserJinglesError ?
                <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{gettingAllUserJinglesError}</MessageBox>
                :
                hasJingles ?
                  (
                    <WrapJinglesContent
                      nonWrappedJingles={allNonWrappedJingles}
                      ogWrappedUserJingles={ogWrappedUserJingles}
                      newWrappedUserJingles={newWrappedUserJingles}
                    />
                  )
                  :
                  (
                    <EmptyState
                      text={t('common.no_jingles')}
                      buttonText={t('common.compose_your_first_jingle')}
                      handleButtonClick={handleEmptyStateButtonClickCallback}
                    />
                  )
          }
        </div>
      </div>
    </div>
  );
};

WrapJingles.defaultProps = {
  v0UserJingles: null,
  v1UserJingles: null,
  ogWrappedUserJingles: null,
  newWrappedUserJingles: null,
};

WrapJingles.propTypes = {
  getAllUserJinglesAction: PropTypes.func.isRequired,
  gettingAllUserJingles: PropTypes.bool.isRequired,
  gettingAllUserJinglesError: PropTypes.string.isRequired,
  v0UserJingles: PropTypes.array,
  v1UserJingles: PropTypes.array,
  ogWrappedUserJingles: PropTypes.array,
  newWrappedUserJingles: PropTypes.array,
  address: PropTypes.string.isRequired,
};

const mapStateToProps = ({ jingle, app }) => ({
  gettingAllUserJingles: jingle.gettingAllUserJingles,
  gettingAllUserJinglesError: jingle.gettingAllUserJinglesError,
  v0UserJingles: jingle.v0UserJingles,
  v1UserJingles: jingle.v1UserJingles,
  ogWrappedUserJingles: jingle.ogWrappedUserJingles,
  newWrappedUserJingles: jingle.newWrappedUserJingles,
  address: app.address,
});

const mapDispatchToProps = { getAllUserJinglesAction };

export default connect(mapStateToProps, mapDispatchToProps)(WrapJingles);
