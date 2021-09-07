import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { getAllJinglesAction } from '../../actions/jingleActions';
import { MESSAGE_BOX_TYPES } from '../../constants/general';
import WrapJinglesContent from './WrapJinglesContent/WrapJinglesContent';
import MessageBox from '../Common/MessageBox/MessageBox';

import BoxLoader from '../Decorative/BoxLoader';
import './WrapJingles.scss';

const WrapJingles = ({
  getAllJinglesAction, gettingAllJingles,
  gettingAllJinglesError, allJingles,
}) => {
  const center = useMemo(() => gettingAllJingles || gettingAllJinglesError, [gettingAllJingles, gettingAllJinglesError]);

  useEffect(() => getAllJinglesAction(), [getAllJinglesAction]);

  return (
    <div className={clsx('wrap-jingle-wrapper', { getting: center })}>
      <div className="width-container">
        {
          gettingAllJingles ?
            <BoxLoader />
            :
            gettingAllJinglesError ?
              <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{gettingAllJinglesError}</MessageBox>
              :
              allJingles && (<WrapJinglesContent jingles={allJingles.jingles} />)
        }
      </div>
    </div>
  );
};

WrapJingles.defaultProps = {
  gettingAllJinglesError: '',
  allJingles: null,
};

WrapJingles.propTypes = {
  getAllJinglesAction: PropTypes.func.isRequired,
  gettingAllJingles: PropTypes.bool.isRequired,
  gettingAllJinglesError: PropTypes.string,
  allJingles: PropTypes.object,
};

const mapStateToProps = ({ jingle }) => ({
  gettingAllJingles: jingle.gettingAllJingles,
  gettingAllJinglesError: jingle.gettingAllJinglesError,
  allJingles: jingle.allJingles,
});

const mapDispatchToProps = { getAllJinglesAction };

export default connect(mapStateToProps, mapDispatchToProps)(WrapJingles);
