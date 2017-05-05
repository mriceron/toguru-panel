import React from 'react'
import ReactPaginate from 'react-paginate'

export const Paginator = ({onClick, pagesTotal, currentPage = 1}) => (
  <ReactPaginate previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={<span href="">...</span>}
                      breakClassName={"break-me"}
                      pageCount={pagesTotal}
                      forcePage={currentPage - 1}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={data => onClick(data.selected + 1)}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
)
