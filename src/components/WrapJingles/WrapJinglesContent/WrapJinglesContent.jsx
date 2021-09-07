import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { APPROVE_TYPES } from 'constants/assets';
import { filterNonOGJingles, filterOGJingles } from 'services/jingleService';
import WrapJinglesContentJingleItem from './WrapJinglesContentJingleItem/WrapJinglesContentJingleItem';
import { WrappedOGJingleAddress, WrappedNewJingleAddress } from '../../../util/config';

import './WrapJinglesContent.scss';

const WrapJinglesContent = ({ jingles }) => {
  const [oGJingles, nonOgJingles] = useMemo(() => [filterOGJingles(jingles), filterNonOGJingles(jingles)], [jingles]);
  const [hasOGJingles, hasNonOgJingles] = useMemo(() => [oGJingles.length > 0, nonOgJingles.length > 0], [oGJingles, nonOgJingles]);

  return (
    <div className="wrap-jingles-content-wrapper">
      {
        hasOGJingles && (
          <div className="wrap-section">
            <div className="wrap-title">OG Jingles</div>

            <div className="wrap-content">
              {
                oGJingles.map((jingle) => (
                  <WrapJinglesContentJingleItem
                    key={`og-${jingle.version}-${jingle.jingleId}`}
                    jingle={jingle}
                    approveAddress={WrappedOGJingleAddress}
                    approveType={APPROVE_TYPES.WRAPPING_OG}
                    isOg
                  />
                ))
              }
            </div>
          </div>
        )
      }

      {
        hasNonOgJingles && (
          <div className="wrap-section">
            <div className="wrap-title">New Jingles</div>

            <div className="wrap-content">
              {
                nonOgJingles.map((jingle) => (
                  <WrapJinglesContentJingleItem
                    key={`new-${jingle.version}-${jingle.jingleId}`}
                    jingle={jingle}
                    approveAddress={WrappedNewJingleAddress}
                    approveType={APPROVE_TYPES.WRAPPING_NON_OG}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

WrapJinglesContent.defaultProps = {
  jingles: null,
};

WrapJinglesContent.propTypes = { jingles: PropTypes.array };

export default WrapJinglesContent;
