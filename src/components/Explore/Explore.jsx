import React, { useEffect, useMemo } from 'react';
import t from 'translate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  getExploreJinglesAction,
  onExplorePaginationChange,
  clearExploreJinglesAction,
} from 'redux/actions/exploreActions';
import { EXPLORE_JINGLES_PER_PAGE } from 'constants/explore';
import ExploreSortFilter from './ExploreSortFilter/ExploreSortFilter';
import BoxLoader from '../Decorative/BoxLoader';
import MessageBox from '../Common/MessageBox/MessageBox';
import { MESSAGE_BOX_TYPES } from '../../constants/general';
import LoadingErrorOverlay from '../Common/LoadingErrorOverlay/LoadingErrorOverlay';
import SingleJingle from '../SingleJingle/SingleJingle';
import Pagination from '../Pagination/Pagination';

import './Explore.scss';

const Explore = ({
  jingles, totalJingles, onExplorePaginationChange, getExploreJinglesAction,
  gettingJinglesBasic, gettingJinglesBasicError, gettingJingles, gettingJinglesError,
  clearExploreJinglesAction,
}) => {
  const loadedJingles = useMemo(() => jingles !== null, [jingles]);
  const hasJingles = useMemo(() => loadedJingles && jingles.length > 0, [loadedJingles, jingles]);

  const loading = useMemo(() => gettingJinglesBasic || gettingJingles, [gettingJinglesBasic, gettingJingles]);
  const error = useMemo(() => gettingJinglesBasicError || gettingJinglesError, [gettingJinglesBasicError, gettingJinglesError]);
  const center = useMemo(() => error || loading || !hasJingles, [error, loading, hasJingles]);

  useEffect(() => {
    getExploreJinglesAction();
    return () => { clearExploreJinglesAction(); };
  }, [getExploreJinglesAction, clearExploreJinglesAction]);

  return (
    <div className={clsx('explore-page-wrapper page-wrapper', { center, 'loading-error-overlay': jingles && (gettingJingles || gettingJinglesError) })}>
      <div className="width-container">
        <div className="page-header-wrapper">
          <div className="page-title">
            { t('common.explore') }
            { totalJingles !== 0 && ` (${totalJingles} Jingles)` }
          </div>
          <div className="page-description">
            Here you can see all the Jingles ever minted. We appreciate all the support this project has gotten during recent events, love you guys. Jingle long and prosper.
          </div>
        </div>

        <ExploreSortFilter disabled={!jingles || gettingJingles || gettingJinglesBasic} />

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

                  <div className="songs-wrapper">
                    {
                      jingles.map((jingle) => (
                        <SingleJingle
                          key={`${jingle.version}-${jingle.jingleId}`}
                          {...jingle}
                        />
                      ))
                    }
                  </div>
                </>
              )
          }
        </div>

        {
          jingles && totalJingles > EXPLORE_JINGLES_PER_PAGE && (
            <Pagination
              disabled={gettingJingles}
              pageCount={Math.ceil(totalJingles / EXPLORE_JINGLES_PER_PAGE)}
              onPageChange={onExplorePaginationChange}
            />
          )
        }
      </div>
    </div>
  );
};

Explore.defaultProps = {
  jingles: null,
};

Explore.propTypes = {
  jingles: PropTypes.array,
  totalJingles: PropTypes.number.isRequired,
  getExploreJinglesAction: PropTypes.func.isRequired,
  clearExploreJinglesAction: PropTypes.func.isRequired,
  onExplorePaginationChange: PropTypes.func.isRequired,

  gettingJinglesBasic: PropTypes.bool.isRequired,
  gettingJinglesBasicError: PropTypes.string.isRequired,
  gettingJingles: PropTypes.bool.isRequired,
  gettingJinglesError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ explore }) => ({
  totalJingles: explore.totalJingles,
  jingles: explore.jingles,

  gettingJinglesBasic: explore.gettingJinglesBasic,
  gettingJinglesBasicError: explore.gettingJinglesBasicError,

  gettingJingles: explore.gettingJingles,
  gettingJinglesError: explore.gettingJinglesError,
});

const mapDispatchToProps = { getExploreJinglesAction, onExplorePaginationChange, clearExploreJinglesAction };

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
