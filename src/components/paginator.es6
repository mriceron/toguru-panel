import React from 'react'

export const Paginator = ({onClick, pagesTotal, currentPage = 1}) => (
  <ul className="pagination">
    {[...Array(pagesTotal)].map((x, i) =>
      <li className={currentPage == (i + 1) ? "active" : undefined} key={i}><a onClick={e => onClick(i + 1)}>{i + 1}</a></li>
    )}
  </ul>
)
