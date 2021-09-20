import React from 'react'

function Pagination({ blogPerPage, totalBlog, active, paginate }) {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalBlog / blogPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
      {pageNumbers.map((number) => (
        <li
          onClick={() => paginate(number)}
          className={`relative cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 hover:bg-gray-200 bg-white text-sm font-medium hover:bg-gray-50 ${
            active === number ? 'text-eden font-bold' : 'text-leather'
          }`}
          key={`pagination-item-${number}`}
        >
          {number}
        </li>
      ))}
    </nav>
  )
}

export default Pagination
