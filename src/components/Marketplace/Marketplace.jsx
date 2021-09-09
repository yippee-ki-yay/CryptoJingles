import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import t from 'translate';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import {
  getMarketplaceJinglesAction, onMarketplacePaginationChange, clearMarketplaceJinglesAction,
} from '../../actions/marketplaceActions';
import { MARKETPLACE_JINGLES_PER_PAGE } from '../../constants/actionTypes';
import SingleJingle from '../SingleJingle/SingleJingle';
import Pagination from '../Pagination/Pagination';
import MarketplaceSort from './MarketplaceSort/MarketplaceSort';
import LoadingErrorOverlay from '../Common/LoadingErrorOverlay/LoadingErrorOverlay';
import BoxLoader from '../Decorative/BoxLoader';
import MessageBox from '../Common/MessageBox/MessageBox';
import EmptyState from '../Common/EmptyState/EmptyState';

import './Marketplace.scss';

const Marketplace = ({
  jingles, jinglesPerPage, totalJingles, onMarketplacePaginationChange, getMarketplaceJinglesAction,
  gettingJinglesBasic, gettingJinglesBasicError, gettingJingles, gettingJinglesError, clearMarketplaceJinglesAction,
}) => {
  const loadedJingles = useMemo(() => jingles !== null, [jingles]);
  const hasJingles = useMemo(() => loadedJingles && jingles.length > 0, [loadedJingles, jingles]);

  const loading = useMemo(() => gettingJinglesBasic || gettingJingles, [gettingJinglesBasic, gettingJingles]);
  const error = useMemo(() => gettingJinglesBasicError || gettingJinglesError, [gettingJinglesBasicError, gettingJinglesError]);
  const center = useMemo(() => error || loading || !hasJingles, [error, loading, hasJingles]);

  useEffect(() => {
    getMarketplaceJinglesAction();

    return () => { clearMarketplaceJinglesAction(); };
  }, [getMarketplaceJinglesAction, clearMarketplaceJinglesAction]);

  return (
    <div className={clsx('marketplace-page-wrapper page-wrapper', { center, 'loading-error-overlay': jingles && (gettingJingles || gettingJinglesError) })}>
      <div className="width-container">
        <div className="page-header-wrapper">
          <div className="page-title">
            { t('common.marketplace') }
            { totalJingles !== 0 && ` (${totalJingles} Jingles)` }
          </div>
          <div className="page-description">
            The marketplace currently supports only v1 Jingles. We are working on adding support for the minted v0 jingles as well!
            If you want to list your jingles someplace else, head over to the Wrap Jingles page.
          </div>
        </div>

        <MarketplaceSort disabled={!jingles || gettingJingles || gettingJinglesBasic} />

        <div className="page-content-wrapper">

          {
            !loadedJingles ?
              (
                <>
                  {
                    loading ?
                      (
                        <div className="loader-wrapper">
                          <BoxLoader />
                          <div className="loader-message">{ t('common.getting_jingles') }</div>
                        </div>
                      )
                      :
                      (error) && (<MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{error}</MessageBox>)
                  }
                </>
              )
              :
              (
                <>
                  {
                    (gettingJingles || gettingJinglesError) && (<LoadingErrorOverlay loading={gettingJingles} error={gettingJinglesError} loadingText="common.getting_jingles" />)
                  }

                  {
                    !hasJingles ?
                      (<EmptyState text={t('marketplace.no_jingles')} />)
                      :
                      (
                        <div className="songs-wrapper">
                          { jingles && jingles.map((jingle) => (
                            <SingleJingle
                              type="marketplace"
                              key={jingle.jingleId}
                              {...jingle}
                            />
                          )) }
                        </div>
                      )
                  }
                </>
              )
          }
        </div>

        {
          jingles && totalJingles > MARKETPLACE_JINGLES_PER_PAGE && (
            <Pagination
              disabled={gettingJingles}
              pageCount={Math.ceil(totalJingles / jinglesPerPage)}
              onPageChange={onMarketplacePaginationChange}
            />
          )
        }
      </div>
    </div>
  );
};

Marketplace.defaultProps = {
  jingles: null,
};

Marketplace.propTypes = {
  jingles: PropTypes.array,
  jinglesPerPage: PropTypes.number.isRequired,
  totalJingles: PropTypes.number.isRequired,
  getMarketplaceJinglesAction: PropTypes.func.isRequired,
  clearMarketplaceJinglesAction: PropTypes.func.isRequired,
  onMarketplacePaginationChange: PropTypes.func.isRequired,

  gettingJinglesBasic: PropTypes.bool.isRequired,
  gettingJinglesBasicError: PropTypes.string.isRequired,
  gettingJingles: PropTypes.bool.isRequired,
  gettingJinglesError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ marketplace }) => ({
  totalJingles: marketplace.totalJingles,
  jinglesPerPage: marketplace.jinglesPerPage,
  jingles: marketplace.jingles,

  gettingJinglesBasic: marketplace.gettingJinglesBasic,
  gettingJinglesBasicError: marketplace.gettingJinglesBasicError,

  gettingJingles: marketplace.gettingJingles,
  gettingJinglesError: marketplace.gettingJinglesError,
});

const mapDispatchToProps = {
  getMarketplaceJinglesAction, onMarketplacePaginationChange, clearMarketplaceJinglesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
