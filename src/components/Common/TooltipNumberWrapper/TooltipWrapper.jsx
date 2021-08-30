import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import trans from 'translate';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from 'react-tippy';
import TitleFormat from './TitleFormat';

const TooltipWrapper = ({
  title, disabled, children, copy, className,
}) => {
  const [copiedText, setCopiedText] = useState('');

  const handleCopyClick =
    useCallback(() => {
      setCopiedText('common.copied_to_clipboard');
      setTimeout(() => { setCopiedText(''); }, 700);
    }, []);

  return (
    <Tooltip
      hideOnClick={false}
      html={copiedText || <TitleFormat copy={copy} title={title} />}
      disabled={disabled}
      className={clsx('tooltip-item', { [className]: className })}
    >
      {
        copy
          ? (<CopyToClipboard text={title} onCopy={handleCopyClick}><span>{children}</span></CopyToClipboard>)
          : (<span>{children}</span>)
      }
    </Tooltip>
  );
};

TooltipWrapper.defaultProps = {
  disabled: false,
  copy: true,
  title: '',
  className: '',
};

TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  copy: PropTypes.bool,
  className: PropTypes.string,
};

export default TooltipWrapper;
