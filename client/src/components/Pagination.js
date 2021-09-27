import { useState } from 'react';
import SinglePaste from './SinglePaste';
export default function Pagination({
  allPastes,
  pageLimit,
  dataLimit,
  singlePaste,
}) {
  const [pages] = useState(Math.round(allPastes.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(item) {
    // console.log(item);
    const pageNumber = Number(item);
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return allPastes.slice(startIndex, endIndex);
  };

  const getPaginatedGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <div className="main paste">
        {getPaginatedData().map((singlePaste, i) => {
          return <SinglePaste singlePaste={singlePaste} key={i} />;
        })}
      </div>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
          Prev
        </button>
        {getPaginatedGroup().map((item, index) => (
          <button
            key={index}
            onClick={() => changePage(item)}
            className={`paginationItem ${
              currentPage === item ? 'active' : null
            }`}>
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}>
          next
        </button>
      </div>
    </div>
  );
}
