import { Fragment, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";

interface Props<T> {
  listData: T[];
  title: string;
  tableHeading: string[];
  renderRow: (item: T) => JSX.Element; // Trả về 1 phần tử JSX
  keys: string[];
}

function Table<T>({
  listData,
  title,
  tableHeading,
  renderRow,
  keys,
}: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [sortState, setSortState] = useState<{
    key: string;
    order: "asc" | "desc";
  }>({
    key: keys[0],
    order: "asc",
  });

  const lastIndexOfPage = currentPage * itemsPerPage;
  const firstIndexOfPage = lastIndexOfPage - itemsPerPage;

  const search = (data: T[]) => {
    return data.filter((item) => {
      return keys.some((key) => {
        const itemValue = (item as any)[key].toString().toUpperCase();
        return itemValue.includes(query.toUpperCase());
      });
    });
  };

  const searchedItems = search(listData);

  const sortedItems = [...searchedItems].sort((a, b) => {
    const aValue = (a as any)[sortState.key];
    const bValue = (b as any)[sortState.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortState.order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortState.order === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortState.order === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // Trong trường hợp không thể so sánh, trả về 0 để giữ nguyên thứ tự
    return 0;
  });

  const currenItems = sortedItems.slice(firstIndexOfPage, lastIndexOfPage);

  const pages = [];
  for (let i = 1; i <= Math.ceil(sortedItems.length / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <Fragment>
      <div className="container mt-4">
        <nav className="navbar bg-body-tertiary">
          <div className="container row">
            <h1 className="col-4">{title}</h1>
            <div className="row col-7">
              <button
                className="col-1 btn btn-light"
                onClick={() => {
                  setSortState((prevSortState) => ({
                    key: sortState.key,
                    order:
                      prevSortState.key === sortState.key
                        ? prevSortState.order === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  }));
                }}
              >
                {sortState.order === "asc" ? (
                  <FaSortAmountUp />
                ) : (
                  <FaSortAmountDown />
                )}
              </button>
              <div className="col-5">
                <select
                  className="form-select"
                  onChange={(e) => {
                    setSortState(() => ({
                      key: e.target.value,
                      order: "asc",
                    }));
                  }}
                >
                  {keys.map((key) => (
                    <option key={key} value={key}>
                      Sort by {key.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <form className="d-flex col" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              {tableHeading.map((heading, index) => (
                <th key={index} scope="col" className="text-center">
                  {heading.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currenItems.map((data, index) => (
              <tr className="text-center" key={index}>
                {renderRow(data)}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-end mt-4">
          <label className="me-2">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="form-select"
            >
              <option value="5">5/Trang</option>
              <option value="10">10/Trang</option>
              <option value="20">20/Trang</option>
              <option value="50">50/Trang</option>
            </select>
          </label>
          <span className="d-flex align-items-center grid gap-1">
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage === 1}
              className="btn btn-outline-primary me-1"
              type="button"
            >
              Previous
            </button>
            {pages.map((page, index) => {
              if (
                page === 1 ||
                page === pages.length ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPage(page);
                    }}
                    className={`btn btn-outline-primary btn-number btn-auto-width text-center-inside  ${
                      page === currentPage ? "active" : ""
                    }`}
                    type="button"
                    style={{ width: 40 }}
                  >
                    {page}
                  </button>
                );
              } else if (page === 2 || page === pages.length - 1) {
                return <span key={index}>...</span>;
              }
            })}
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              disabled={currentPage === pages.length}
              className="btn btn-outline-primary me-1"
              type="button"
            >
              Next
            </button>
          </span>
        </div>
      </div>
    </Fragment>
  );
}

export default Table;
