import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import t from 'translate';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import { clearUnwrapAction, unwrapJingleAction } from 'redux/actions/jingleActions';
import SingleJingle from '../../../SingleJingle/SingleJingle';
import MessageBox from '../../../Common/MessageBox/MessageBox';

const WrapJinglesContentUnwrapJingleItem = ({
  jingle, unwrapJingleAction, unwrapKey, isOg,
  jingleUnwrapping, jingleUnwrappingError, clearUnwrapAction,
}) => {
  const buttonLabel = useMemo(() => {
    if (jingleUnwrapping) return isOg ? t('jingles.unwrapping_og_wrapper') : t('jingles.unwrapping_new_wrapper');

    return isOg ? t('jingles.unwrap_og_wrapper') : t('jingles.unwrap_new_wrapper');
  }, [jingleUnwrapping, isOg]);

  const unwrapJinglesActionCallback = useCallback(() => unwrapJingleAction(jingle.jingleId, jingle.version, unwrapKey, isOg), [unwrapJingleAction, jingle.jingleId, jingle.version, unwrapKey, isOg]);

  const clearWrapActionCallback = useCallback(() => clearUnwrapAction(jingle.jingleId, jingle.version, unwrapKey), [jingle, unwrapKey, clearUnwrapAction]);

  useEffect(() => () => { clearWrapActionCallback(); }, [clearWrapActionCallback]);

  return (
    <div className="wrap-jingles-content-jingle-item-wrapper wrap">
      <SingleJingle {...jingle} />

      <button
        type="button"
        onClick={unwrapJinglesActionCallback}
        className="button red"
        disabled={jingleUnwrapping}
      >
        {buttonLabel}
      </button>

      { jingleUnwrappingError && (<MessageBox type={MESSAGE_BOX_TYPES.ERROR}>{ jingleUnwrappingError }</MessageBox>) }
    </div>
  );
};

WrapJinglesContentUnwrapJingleItem.defaultProps = {
  isOg: false,
};

WrapJinglesContentUnwrapJingleItem.propTypes = {
  jingle: PropTypes.object.isRequired,
  unwrapKey: PropTypes.string.isRequired,
  unwrapJingleAction: PropTypes.func.isRequired,
  clearUnwrapAction: PropTypes.func.isRequired,
  isOg: PropTypes.bool,
  jingleUnwrappingError: PropTypes.string.isRequired,
  jingleUnwrapping: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { jingle }) => {
  const unwrapKey = `v${jingle.version}-${jingle.jingleId}`;

  const singleUnwrappingJingle = state.jingle.unwrappingJingles[unwrapKey];
  const jingleUnwrapping = singleUnwrappingJingle ? singleUnwrappingJingle.unwrapping : false;
  const jingleUnwrappingError = singleUnwrappingJingle ? singleUnwrappingJingle.error : '';

  return ({
    unwrapKey,
    jingleUnwrapping,
    jingleUnwrappingError,
  });
};

const mapDispatchToProps = { unwrapJingleAction, clearUnwrapAction };

export default connect(mapStateToProps, mapDispatchToProps)(WrapJinglesContentUnwrapJingleItem);
