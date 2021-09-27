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

  //Go to the next page
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  //Go to the previous page
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  //Go to any page
  function changePage(item) {
    const pageNumber = Number(item);
    setCurrentPage(pageNumber);
  }

  //Get the pastes according to the page
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return allPastes.slice(startIndex, endIndex);
  };

  //Get the number of the pages to show
  const getPaginatedGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    const showPages = new Array(pageLimit)
      .fill()
      .map((_, idx) => start + idx + 1);

    const found = showPages.find((elem) => elem > pages);

    if (!found) {
      return showPages;
    }
    const spliceIndex = showPages.findIndex((elem) => elem > pages);
    return showPages.splice(0, spliceIndex);
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
          {'<<'}
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
          {'>>'}
        </button>
      </div>
    </div>
  );
}
