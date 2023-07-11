import "./styles/Pagination.css";

const Pagination = ({
  totalResidents,
  residentsPerPage,
  setCurrentPage,
  currentPage,
}) => {

  const pages = [];

  for (let i = 1; i <= Math.ceil(totalResidents / residentsPerPage); i++) {
    pages.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div className="pagination">
      <button
            onClick={onPreviusPage}
            disabled={currentPage == pages[0] ? true : false}
            className={currentPage == 1 ? "disabled" : ""}
          >
            {'<<'}
    </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
      <button
            onClick={onNextPage}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
            className={currentPage >= pages.length  ? "disabled" : ""}
          >
          {'>>'}
        </button>
    </div>
  );
};

export default Pagination;
