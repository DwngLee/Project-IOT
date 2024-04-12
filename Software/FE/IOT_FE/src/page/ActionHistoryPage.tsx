import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import NarBar from "../components/NavBarComponent";
import { fetchDataAction } from "../services/dataSensorApi";
import { ActionHistory, Action } from "../class/ActionHistory";
import ReactPaginate from "react-paginate";
import DateTimeInput from "../components/DateTimeInputComponent";
import actionApi from "../services/actionApi";

function ActionHistoryPage() {
  const todayDate = format(new Date(), "yyyy-MM-dd HH:mm");

  const [listData, setListData] = useState<ActionHistory[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [pageOffSet, setPageOffSet] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState("2024-01-01 00:00");
  const [endDate, setEndDate] = useState(todayDate);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData(currentPage, limit, startDate, endDate);
  }, [limit, currentPage, startDate, endDate]);

  const getData = async (
    page: number,
    limit: number,
    startDate: string,
    endDate: string
  ) => {
    try {
      let res = await actionApi.getAll(page, limit, startDate, endDate);
      if (res && res.content) {
        setPageCount(res.totalPages);
        setListData(res.content);
        setTotalItem(res.totalElements);
        setPageOffSet(res.pageable.offset);
      }
    } catch (e) {
      setError(e.response.data.message);
      setPageCount(0);
      setTotalItem(0);
      setPageOffSet(0);
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <Fragment>
      <NarBar></NarBar>
      <div className="container">
        <p className="fw-bold fs-2 mt-2 mb-0">Action History</p>
        <DateTimeInput
          onDatesChange={handleDate}
          startDate={startDate}
          endDate={endDate}
        ></DateTimeInput>
        <table className="table table-striped table-sm mt-3 text-center">
          <thead>
            <tr>
              <th scope="col">
                ID <i className="fa-solid fa-arrow-up-long"></i>
              </th>
              <th scope="col">DEVICE NAME</th>
              <th scope="col">ACTION</th>
              <th scope="col">TIME</th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              listData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.deviceName}</td>
                  <td>{item.action}</td>
                  <td>{format(new Date(item.time), "dd/MM/yyyy HH:mm:ss")}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {error && (
          <p className="text-center fw-bold text-danger fs-3">{error}</p>
        )}
        <div className="container">
          <div className="row align-items-center justify-content-end">
            <div className="col-auto">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
            <div className="col-auto">
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="form-select mb-3"
              >
                <option value="5">5/Page</option>
                <option value="10">10/Page</option>
                <option value="20">20/Page</option>
                <option value="50">50/Page</option>
              </select>
            </div>
            <div className="col-auto">
              <p className="align-self-center">
                {pageOffSet + 1} -{" "}
                {pageOffSet + limit > totalItem
                  ? totalItem
                  : pageOffSet + limit}{" "}
                of {totalItem}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ActionHistoryPage;
