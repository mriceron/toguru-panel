import React from 'react'
import ReactPaginate from 'react-paginate'

export const Paginator = ({onClick, totalEntries, perPage, currentPage = 1}) => (
  <ReactPaginate previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={<span href="">...</span>}
                      breakClassName={"break-me"}
                      pageCount={totalPages(totalEntries, perPage)}
                      forcePage={currentPage - 1}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={data => onClick(data.selected + 1)}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
)

export const paginationFilter = (page, perPage) => (_, index) =>
  (index >= (page - 1) * perPage) && (index < (page * perPage))

const totalPages = (totalEntries, perPage) =>
  Math.ceil(totalEntries / perPage)
