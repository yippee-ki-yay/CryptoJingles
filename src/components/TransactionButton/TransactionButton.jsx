import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trans from 'translate';
import clsx from 'clsx';
import DoneStatusIcon from '../Common/Icons/StatusIcons/DoneStatusIcon';
import ErrorStatusIcon from '../Common/Icons/StatusIcons/ErrorStatusIcon';
import ExecutingStatusIcon from '../Common/Icons/StatusIcons/ExecutingStatusIcon';
import ConnectWalletButton from '../Header/ConnectWalletButton/ConnectWalletButton';

import './TransactionButton.scss';

const TransactionButton = ({
  ext, extError, extSuccess, handleClick, label, addClassName,
  btnColor, submit, disabled, address, toConnectText,
}) => {
  const buttonLabel = useMemo(() => {
    if (extError) return trans('errors.error');
    if (extSuccess) return trans('common.success');

    return label;
  }, [extError, extSuccess, label]);

  if (!address) {
    return (
      <div className="transaction-button-wrapper">
        <ConnectWalletButton toConnectText={toConnectText} />
      </div>
    );
  }

  return (
    <div className="transaction-button-wrapper">
      <button
        disabled={disabled || !address}
        type={submit ? 'submit' : 'button'}
        className={clsx('transaction-button button', { [addClassName]: addClassName, [btnColor]: btnColor })}
        onClick={handleClick}
      >
        { ext && <div className="ext-icon"><ExecutingStatusIcon /></div> }
        { extError && <div className="err-icon"><ErrorStatusIcon /></div> }
        { extSuccess && <DoneStatusIcon /> }

        <div className="button-value">
          { buttonLabel }
        </div>
      </button>
    </div>
  );
};

TransactionButton.defaultProps = {
  addClassName: '',
  ext: false,
  extError: '',
  extSuccess: false,
  btnColor: '',
  address: '',
  disabled: false,
  submit: false,
  toConnectText: '',
  handleClick: () => {},
};

TransactionButton.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  addClassName: PropTypes.string,
  ext: PropTypes.bool,
  extError: PropTypes.string,
  extSuccess: PropTypes.bool,
  btnColor: PropTypes.string,
  toConnectText: PropTypes.string,
  submit: PropTypes.bool,
  disabled: PropTypes.bool,
  address: PropTypes.string,
};

const mapStateToProps = ({ app }) => ({
  address: app.address,
});

export default connect(mapStateToProps)(TransactionButton);
