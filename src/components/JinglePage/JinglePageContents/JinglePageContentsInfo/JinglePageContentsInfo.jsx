import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getJingleMetadata } from 'constants/getMockData';
import { WrappedNewJingleAddress, WrappedOGJingleAddress } from '../../../../util/config';

import OpenSeaIcon from '../../../Common/Icons/OpenSeaIcon';
import './JinglePageContentsInfo.scss';

const JinglePageContentsInfo = ({ singleJingle }) => {
  const history = useHistory();

  const samplesData = useMemo(() => singleJingle.sampleTypes.map((id) => getJingleMetadata(id)), [singleJingle.sampleTypes]);

  const handleOwnerClickCallback = useCallback(() => {
    if (singleJingle.externalOwner) return;
    history.push(`/profile/${singleJingle.owner}`);
  }, [history, singleJingle]);

  const handleRealOwnerClickCallback = useCallback(() => {
    if (!singleJingle.externalOwner) return;
    history.push(`/profile/${singleJingle.realOwner}`);
  }, [history, singleJingle]);

  const openSeaLink = useMemo(() => {
    if (!singleJingle.wrapped) return '';

    const contractAddress = singleJingle.ogWrapped ? WrappedOGJingleAddress : WrappedNewJingleAddress;
    return `https://opensea.io/assets/${contractAddress}/${singleJingle.wrappedTokenId}`;
  }, [singleJingle]);

  return (
    <div className="jingle-page-contents-info-wrapper">
      <div className="info-item-wrapper">
        <div className="info-item-label">Owner</div>
        <div
          className={clsx('info-item-value address', { link: !singleJingle.externalOwner })}
          onClick={handleOwnerClickCallback}
        >
          { singleJingle.owner.toUpperCase() }
        </div>
      </div>

      {
        singleJingle.realOwner && (
          <div className="info-item-wrapper">
            <div className="info-item-label">Token owner</div>
            <div
              className={clsx('info-item-value address', { link: singleJingle.externalOwner })}
              onClick={handleRealOwnerClickCallback}
            >
              { singleJingle.realOwner }
            </div>
          </div>
        )
      }

      <div className="info-item-wrapper">
        <div className="info-item-label">Author</div>
        <div className="info-item-value">{ singleJingle.author }</div>
      </div>

      <div className="info-item-wrapper">
        <div className="info-item-label">Name</div>
        <div className="info-item-value">{ singleJingle.name }</div>
      </div>

      <div className="info-item-wrapper samples">
        <div className="info-item-label">Samples</div>
        <div className="info-item-value">
          {
            samplesData.map(({ name, rarity }) => (
              <div key={name} className={clsx('single-sample', { [`rarity-${rarity}`]: true })}>{ name }</div>
            ))
          }
        </div>
      </div>

      {
        singleJingle.wrapped && (
          <div className="info-item-wrapper opensea">
            <div className="info-item-label">See on <OpenSeaIcon /></div>

            <a
              className="info-item-value link address external"
              href={openSeaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              { openSeaLink }
            </a>
          </div>
        )
      }
    </div>
  );
};

JinglePageContentsInfo.propTypes = {
  singleJingle: PropTypes.object.isRequired,
};

const mapStateToProps = ({ singleJingle }) => ({
  singleJingle: singleJingle.singleJingle,
});

export default connect(mapStateToProps)(JinglePageContentsInfo);
