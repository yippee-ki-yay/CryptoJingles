import React from 'react';
import { formatNumber, numberWithCommas } from 'services/utilsService';
import PropTypes from 'prop-types';
import TooltipWrapper from './TooltipWrapper';

const TooltipNumberWrapper = ({
  value, decimals, noFormat, children, useChildren, copy, disabled,
}) => {
  const newVal = noFormat ? value : formatNumber(value, decimals);
  const newTitleValue = noFormat ? value : numberWithCommas(value);

  return (
    <TooltipWrapper title={newTitleValue} copy={copy} disabled={disabled}>
      { useChildren ? children : newVal }
    </TooltipWrapper>
  );
};

TooltipNumberWrapper.defaultProps = {
  value: '',
  decimals: 2,
  noFormat: false,
  useChildren: false,
  copy: true,
  children: null,
  disabled: false,
};

TooltipNumberWrapper.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  useChildren: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  copy: PropTypes.bool,
  decimals: PropTypes.number,
  noFormat: PropTypes.bool,
};

export default TooltipNumberWrapper;
