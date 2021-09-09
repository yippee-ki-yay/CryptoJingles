import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Pagination.scss';

const Pagination = ({
  pageCount, onPageChange, range, disabled,
}) => (
  <div className={clsx('pagination-wrapper', { disabled })}>
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel={<a href="">...</a>}
      breakClassName="break-me"
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={range}
      onPageChange={(data) => { onPageChange(data.selected); }}
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  </div>
);

Pagination.defaultProps = {
  range: 5,
  disabled: false,
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Pagination;
