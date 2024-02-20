import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import NarBar from "../components/NavBarComponent";
import { fetchDataAction } from "../services/UserService";
import { ActionHistory, Action } from "../class/ActionHistory";
import ReactPaginate from "react-paginate";
import DateTimeInput from "../components/DateTimeInputComponent";

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

  useEffect(() => {
    getData(currentPage, limit, startDate, endDate);
  }, [limit, currentPage, startDate, endDate]);

  const getData = async (
    page: number,
    limit: number,
    startDate: string,
    endDate: string
  ) => {
    let res = await fetchDataAction(page, limit, startDate, endDate);
    if (res && res.content) {
      setPageCount(res.totalPages);
      setListData(res.content);
      setTotalItem(res.totalElements);
      setPageOffSet(res.pageable.offset);
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
      <DateTimeInput
        onDatesChange={handleDate}
        startDate={startDate}
        endDate={endDate}
      ></DateTimeInput>

      <table className="table table-striped table-sm">
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
          {listData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.deviceName}</td>
              <td>{item.action}</td>
              <td>{format(new Date(item.time), "dd/MM/yyyy HH:mm:ss")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="form-select"
      >
        <option value="5">5/Trang</option>
        <option value="10">10/Trang</option>
        <option value="20">20/Trang</option>
        <option value="50">50/Trang</option>
      </select>
      <p>
        {pageOffSet + 1} -{" "}
        {pageOffSet + limit > totalItem ? totalItem : pageOffSet + limit}:{" "}
        {totalItem}
      </p>
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
    </Fragment>
  );
}

export default ActionHistoryPage;
