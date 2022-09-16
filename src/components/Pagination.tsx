import React from 'react'
import { usePagination, DOTS } from '../hooks/Pagination'
import '../assets/Pagination.scss'

interface Props {
  totalCount: number
  pageSize: number
  currentPage: number
  onPageChange: (pageNumber: (string | number)) => void
}

export default function Pagination ({ onPageChange, totalCount, pageSize, currentPage }: Props): React.FC | undefined {
  const pages = usePagination({
    totalCount,
    pageSize,
    currentPage
  })

  const lastPage = totalCount / pageSize + (totalCount % pageSize > 0 ? 1 : 0)

  if (pages !== undefined) {
    return
      <nav className="pagination">
        <ul>
          <li>
            {currentPage === 1
              ? (
              <span>
                <i className="bi bi-chevron-double-left"></i>
              </span>
                )
              : (
              <a href="#">
                <i className="bi bi-chevron-double-left"></i>
              </a>
                )}
          </li>
          {pages?.map((page, index) => (
            <li key={index}>
              {page === DOTS || page === currentPage
                ? (
                <span>{page}</span>
                  )
                : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()

                    onPageChange(page)
                  }}
                >
                  {page}
                </a>
                  )}
            </li>
          ))}
          <li>
            {currentPage === lastPage
              ? (
              <span>
                <i className="bi bi-chevron-double-right"></i>
              </span>
                )
              : (
              <a href="#">
                <i className="bi bi-chevron-double-right"></i>
              </a>
                )}
          </li>
        </ul>
      </nav>
  }
}
