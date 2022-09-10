import { usePagination } from '../hooks/Pagination'

export default ({ onPageChange, totalPages, pageSize, currentPage }) => {
  const pages = usePagination({
    totalCount: totalPages,
    pageSize,
    currentPage
  })

  if (pages)
    return (
      <ul>
        {pages.map((page, index) => (
          <li key={index}>page</li>
        ))}
      </ul>
    )
}
