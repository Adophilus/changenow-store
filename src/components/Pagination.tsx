import { usePagination, DOTS } from '../hooks/Pagination'
import '../assets/Pagination.scss'

export default ({ onPageChange, totalCount, pageSize, currentPage }) => {
  const pages = usePagination({
    totalCount: totalCount,
    pageSize,
    currentPage
  })

  const lastPage = totalCount / pageSize + (totalCount % pageSize ? 1 : 0)

  if (pages) {
    if (!pages.length) return null
    return (
      <nav className="pagination">
        <ul>
          <li>
            {currentPage === 1 ? (
              <span>
                <i className="bi bi-chevron-double-left"></i>
              </span>
            ) : (
              <a href="#">
                <i className="bi bi-chevron-double-left"></i>
              </a>
            )}
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              {page === DOTS || page === currentPage ? (
                <span>{page}</span>
              ) : (
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
            {currentPage === lastPage ? (
              <span>
                <i className="bi bi-chevron-double-right"></i>
              </span>
            ) : (
              <a href="#">
                <i className="bi bi-chevron-double-right"></i>
              </a>
            )}
          </li>
        </ul>
      </nav>
    )
  }
}
