import React from 'react';
import ReactPaginate from 'react-paginate';

// TODO - Add prototypes, style component, test with more jingles
const Pagination = ({ pageCount, range = 10, onPageChange }) => (
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
);

export default Pagination;