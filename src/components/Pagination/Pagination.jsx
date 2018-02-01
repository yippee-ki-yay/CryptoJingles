import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.css';

// TODO - Add prototypes, style component, test with more jingles
const Pagination = ({ pageCount, range = 10, onPageChange }) => (
  <div className="pagination-wrapper">
    <ReactPaginate previousLabel={"Previous"}
                   nextLabel={"Next"}
                   breakLabel={<a href="">...</a>}
                   breakClassName={"break-me"}
                   pageCount={pageCount}
                   marginPagesDisplayed={2}
                   pageRangeDisplayed={range}
                   onPageChange={(data) => { onPageChange(data.selected); }}
                   containerClassName={"pagination"}
                   subContainerClassName={"pages pagination"}
                   activeClassName={"active"}
    />
  </div>
);

export default Pagination;