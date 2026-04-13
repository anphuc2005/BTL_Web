import '../../styles/adminStyles/Pagination.css'

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
    
    pages.push(1)
    
    
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)
    
    if (start > 2) {
      pages.push('...')
    }
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (end < totalPages - 1) {
      pages.push('...')
    }
    
    if (totalPages > 1) {
      pages.push(totalPages)
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination">
      <button 
        className="pagination__btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        ‹
      </button>
      
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return <span key={`dots-${index}`} className="pagination__dots">...</span>
        }
        
        return (
          <button 
            key={page}
            className={`pagination__btn ${currentPage === page ? 'pagination__btn--active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      })}
      
      <button 
        className="pagination__btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        ›
      </button>
    </div>
  )
}