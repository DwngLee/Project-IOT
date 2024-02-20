import { Fragment, useState, useEffect } from "react";
import NarBar from "../components/NavBarComponent";
import Table from "../components/TableComponent";
import DataSensor from "../class/DataSensor";
import { format } from "date-fns";
import { fetchDataSensor } from "../services/UserService";
import ReactPaginate from "react-paginate";
import DateTimeInput from "../components/DateTimeInputComponent";
import MultiRangeSlider from "../components/MultiRangeSlider";
import Button from "../components/ButtonComponent";

function DataSensorPage() {
  const todayDate = format(new Date(), "yyyy-MM-dd HH:mm");

  const [listData, setListData] = useState<DataSensor[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [pageOffSet, setPageOffSet] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState("2024-01-01 00:00");
  const [endDate, setEndDate] = useState(todayDate);

  // Thêm state mới để lưu trữ giá trị min/max của MultiRangeSlider
  const [filterValues, setFilterValues] = useState<{
    [key: string]: { min: number; max: number };
  }>({
    Temperature: { min: 0, max: 100 },
    Humidity: { min: 0, max: 100 },
    Light: { min: 0, max: 1000 },
  });


  useEffect(() => {
    getData(currentPage, limit, startDate, endDate);
  }, [limit, currentPage, startDate, endDate]);

  const getData = async (
    currentPage: number,
    limit: number,
    startDate: string,
    endDate: string
  ) => {
    let res = await fetchDataSensor(currentPage, limit, startDate, endDate);
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

  const handleFilter = () => {
    console.log("Filtered Values:", filterValues);
    // Gọi hàm getData với các giá trị filterValues mới
    getData(currentPage, limit, startDate, endDate);
  };

  return (
    <Fragment>
      <NarBar></NarBar>
      <DateTimeInput
        onDatesChange={handleDate}
        startDate={startDate}
        endDate={endDate}
      ></DateTimeInput>

      <div className="mb-5">
        <MultiRangeSlider
          min={0}
          max={100}
          onChange={({ min, max }) =>
            setFilterValues({ ...filterValues, Temperature: { min, max } })
          }
          label="Temperature"
        />
        <MultiRangeSlider
          min={0}
          max={100}
          onChange={({ min, max }) =>
            setFilterValues({ ...filterValues, Humidity: { min, max } })
          }
          label="Humidity"
        />
        <MultiRangeSlider
          min={0}
          max={1000}
          onChange={({ min, max }) =>
            setFilterValues({ ...filterValues, Light: { min, max } })
          }
          label="Light"
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">
              ID <i className="fa-solid fa-arrow-up-long"></i>
            </th>
            <th scope="col">TEMPERATURE</th>
            <th scope="col">HUMIDITY</th>
            <th scope="col">LIGHT</th>
            <th scope="col">CREATED AT</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.temperature}</td>
              <td>{item.humidity}</td>
              <td>{item.light}</td>
              <td>
                {format(new Date(item.created_at), "dd/MM/yyyy HH:mm:ss")}
              </td>
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

export default DataSensorPage;
