import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import t from 'translate';
import { APPROVE_TYPES } from 'constants/assets';
import { filterNonOGJingles, filterOGJingles } from 'services/jingleService';
import WrapJinglesContentJingleItem from './WrapJinglesContentJingleItem/WrapJinglesContentJingleItem';
import { WrappedOGJingleAddress, WrappedNewJingleAddress } from '../../../util/config';

import './WrapJinglesContent.scss';

const WrapJinglesContent = ({
  nonWrappedJingles, ogWrappedUserJingles, newWrappedUserJingles,
}) => {
  const [oGJingles, nonOgJingles] = useMemo(() => [filterOGJingles(nonWrappedJingles), filterNonOGJingles(nonWrappedJingles)], [nonWrappedJingles]);
  const [hasOGJingles, hasNonOgJingles] = useMemo(() => [oGJingles.length > 0, nonOgJingles.length > 0], [oGJingles, nonOgJingles]);

  const [hasOgWrappedUserJingles, hasNewWrappedUserJingles] = useMemo(() => [ogWrappedUserJingles.length > 0, newWrappedUserJingles.length > 0], [ogWrappedUserJingles, newWrappedUserJingles]);

  return (
    <div className="wrap-jingles-content-wrapper">
      {
        hasOgWrappedUserJingles && (
          <div className="wrap-section">
            <div className="wrap-title">{ t('jingles.wrapped_og_jingles') }</div>

            <div className="wrap-content">
              {
                ogWrappedUserJingles.map((jingle) => (
                  <div key={`new-w-${jingle.version}-${jingle.jingleId}`}>OG Wrapped ${jingle.jingleId}</div>
                ))
              }
            </div>
          </div>
        )
      }

      {
        hasNewWrappedUserJingles && (
          <div className="wrap-section">
            <div className="wrap-title">{ t('jingles.wrapped_new_jingles') }</div>

            <div className="wrap-content">
              {
                hasNewWrappedUserJingles.map((jingle) => (
                  <div key={`new-w-${jingle.version}-${jingle.jingleId}`}>New Wrapped ${jingle.jingleId}</div>
                ))
              }
            </div>
          </div>
        )
      }

      {
        hasOGJingles && (
          <div className="wrap-section">
            <div className="wrap-title">{ t('jingles.og_jingles') }</div>

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
            <div className="wrap-title">{ t('jingles.new_jingles') }</div>

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

WrapJinglesContent.propTypes = {
  nonWrappedJingles: PropTypes.array.isRequired,
  ogWrappedUserJingles: PropTypes.array.isRequired,
  newWrappedUserJingles: PropTypes.array.isRequired,
};

export default WrapJinglesContent;
