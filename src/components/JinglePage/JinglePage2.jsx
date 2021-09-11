import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import t from 'translate';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import { getSingleJingleAction } from 'redux/actions/singleJingleActions';
import BoxLoader from '../Decorative/BoxLoader';
import MessageBox from '../Common/MessageBox/MessageBox';

import './JinglePage2.scss';

const JinglePage2 = ({
  match: { params: { version, id } }, getSingleJingleAction,
  gettingSingleJingle, gettingSingleJingleError, singleJingle,
}) => {
  const hasJingle = useMemo(() => singleJingle !== null, [singleJingle]);
  const center = useMemo(() => gettingSingleJingle || gettingSingleJingleError || !hasJingle, [gettingSingleJingle, gettingSingleJingleError, hasJingle]);

  const getSingleJingleActionCallback = useCallback(() => {
    getSingleJingleAction(parseInt(version, 10), parseInt(id, 10));
  }, [version, id, getSingleJingleAction]);

  useEffect(() => { getSingleJingleActionCallback(); }, [getSingleJingleActionCallback]);

  return (
    <div className={clsx('jingle-page-2-wrapper page-wrapper', { center })}>
      <div className="width-container">
        <div className="page-header-wrapper">
          <div className="page-title">
            Jingle
            {
              singleJingle && (
                <div className="title-more">
                  {singleJingle.isOg && <b>GENESIS </b>} v{singleJingle.version} #{ singleJingle.jingleId }
                </div>
              )
            }
          </div>
        </div>

        <div className="page-content-wrapper">
          {
            gettingSingleJingle ?
              (
                <div className="loader-wrapper">
                  <BoxLoader />
                  <div className="loader-message">{ t('common.getting_jingle') }</div>
                </div>
              )
              :
              gettingSingleJingleError ?
                <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{gettingSingleJingleError}</MessageBox>
                :
                singleJingle && (<div>Test { singleJingle.jingleId }</div>)
          }
        </div>
      </div>
    </div>
  );
};

JinglePage2.defaultProps = {
  singleJingle: null,
};

JinglePage2.propTypes = {
  match: PropTypes.object.isRequired,

  getSingleJingleAction: PropTypes.func.isRequired,
  gettingSingleJingle: PropTypes.bool.isRequired,
  gettingSingleJingleError: PropTypes.string.isRequired,
  singleJingle: PropTypes.object,
};

const mapStateToProps = ({ singleJingle }) => ({
  gettingSingleJingle: singleJingle.gettingSingleJingle,
  gettingSingleJingleError: singleJingle.gettingSingleJingleError,
  singleJingle: singleJingle.singleJingle,
});

const mapDispatchToProps = { getSingleJingleAction };

export default connect(mapStateToProps, mapDispatchToProps)(JinglePage2);
