import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter = ({
  className, children, handleClick, onClickOutside,
}) => {
  const wrapperRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    return () => { document.removeEventListener('mousedown', onClickOutside); };
  }, [onClickOutside]);

  return (
    <div ref={wrapperRef} className={className} onClick={handleClick}>
      { children }
    </div>
  );
};

OutsideAlerter.defaultProps = {
  className: '',
  handleClick: () => {},
};

OutsideAlerter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClickOutside: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
};

export default OutsideAlerter;
