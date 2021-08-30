import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { MESSAGE_BOX_TYPES } from '../../../constants/general';

import CloseIcon from '../Icons/CloseIcon';
import DoneStatusIcon from '../Icons/DoneStatusIcon';
import './MessageBox.scss';

const MessageBox = ({
  type, children, handleClick, canClick,
}) => (
  <div
    className={clsx('message-box-wrapper', { [type]: type })}
  >
    <div className="message-box">
      <div className={clsx('status-icon-wrapper', { 'can-click': canClick })} onClick={handleClick}>
        { type === MESSAGE_BOX_TYPES.ERROR && <span><CloseIcon /></span> }
        { type === MESSAGE_BOX_TYPES.SUCCESS && <DoneStatusIcon /> }
      </div>

      <div className="text-wrapper">
        { children }
      </div>
    </div>
  </div>
);

MessageBox.defaultProps = {
  handleClick: () => {},
  canClick: false,
};

MessageBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  canClick: PropTypes.bool,
};

export default MessageBox;
