import { Fragment, useState, useEffect } from "react";
import NarBar from "../components/NavBarComponent";
import DataSensor from "../class/DataSensor";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import DateTimeInput from "../components/DateTimeInputComponent";
import MultiRangeSlider from "../components/MultiRangeSlider";
import { debounce, divide } from "lodash";
import Loading from "../components/Loading";
import dataSensorApi from "../services/dataSensorApi";

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
  const [temperature, setTemperature] = useState({ min: 0, max: 100 });
  const [humidity, setHumidity] = useState({ min: 0, max: 100 });
  const [light, setLight] = useState({ min: 0, max: 1000 });
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState("ALL");
  const [sortColumn, setSortColumn] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    getData(
      currentPage,
      limit,
      searchBy,
      keyword,
      temperature,
      humidity,
      light,
      sortColumn,
      sortDirection
    );
  }, [
    limit,
    currentPage,
    searchBy,
    keyword,
    temperature,
    humidity,
    light,
    sortColumn,
    sortDirection,
  ]);

  const getData = async (
    currentPage: number,
    limit: number,
    searchBy: string,
    keyword: string,
    temperature: { min: number; max: number },
    humidity: { min: number; max: number },
    light: { min: number; max: number },
    sortColumn: string,
    sortDirection: string
  ) => {
    try {
      let res = await dataSensorApi.getAll(
        currentPage,
        limit,
        searchBy,
        keyword,
        temperature,
        humidity,
        light,
        sortColumn,
        sortDirection
      );

      if (res && res.content) {
        setPageCount(res.totalPages);
        setListData(res.content);
        setTotalItem(res.totalElements);
        setPageOffSet(res.pageable.offset);
        setError(null);
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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc"); // Mặc định sort từ mới nhất tới cũ nhất khi chuyển sang cột mới
    }
  };

  return (
    <Fragment>
      <NarBar></NarBar>
      <div className="container">
        <p className="fw-bold fs-2 mt-2 mb-0">Data Sensor</p>
        {/* <DateTimeInput
          onDatesChange={handleDate}
          startDate={startDate}
          endDate={endDate}
        ></DateTimeInput> */}
        <div>
          <div className="row d-flex justify-content-end ">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nhập từ khóa tìm kiếm"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select mb-2"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                defaultValue="ALL"
              >
                <option value="ALL">All</option>
                <option value="id">ID</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="light">Light</option>
                <option value="created_at">Created At</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <div
              className="vstack gap-3 container px-3 shadow bg-body-tertiary rounded "
              style={{ height: "350px" }}
            >
              <div className="my-4 container">
                <MultiRangeSlider
                  min={0}
                  max={100}
                  rangeLabel="Temperature"
                  onChange={debounce(
                    ({ min, max }) => setTemperature({ min, max }),
                    1000
                  )}
                />
              </div>
              <div className="my-4 container">
                <MultiRangeSlider
                  min={0}
                  max={100}
                  rangeLabel="Humidity"
                  onChange={debounce(
                    ({ min, max }) => setHumidity({ min, max }),
                    1000
                  )}
                />
              </div>
              <div className="my-4 container">
                <MultiRangeSlider
                  min={0}
                  max={1000}
                  rangeLabel="Light"
                  onChange={debounce(
                    ({ min, max }) => setLight({ min, max }),
                    1000
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-md-9 text-center">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col" onClick={() => handleSort("id")}>
                    ID{" "}
                    {sortColumn === "id" && (
                      <i
                        className={`fa-solid fa-arrow-${
                          sortDirection === "asc" ? "up" : "down"
                        }-long`}
                        style={{ marginLeft: "4px" }}
                      ></i>
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSort("temperature")}>
                    TEMPERATURE{" "}
                    {sortColumn === "temperature" && (
                      <i
                        className={`fa-solid fa-arrow-${
                          sortDirection === "asc" ? "up" : "down"
                        }-long`}
                        style={{ marginLeft: "4px" }}
                      ></i>
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSort("humidity")}>
                    HUMIDITY{" "}
                    {sortColumn === "humidity" && (
                      <i
                        className={`fa-solid fa-arrow-${
                          sortDirection === "asc" ? "up" : "down"
                        }-long`}
                        style={{ marginLeft: "4px" }}
                      ></i>
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSort("light")}>
                    LIGHT{" "}
                    {sortColumn === "light" && (
                      <i
                        className={`fa-solid fa-arrow-${
                          sortDirection === "asc" ? "up" : "down"
                        }-long`}
                        style={{ marginLeft: "4px" }}
                      ></i>
                    )}
                  </th>
                  <th scope="col" onClick={() => handleSort("created_at")}>
                    CREATED AT{" "}
                    {sortColumn === "created_at" && (
                      <i
                        className={`fa-solid fa-arrow-${
                          sortDirection === "asc" ? "up" : "down"
                        }-long`}
                        style={{ marginLeft: "4px" }}
                      ></i>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {!error &&
                  listData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.temperature}</td>
                      <td>{item.humidity}</td>
                      <td>{item.light}</td>
                      {/* <td>
                        {format(
                          new Date(),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </td> */}
                      <td>{item.created_at}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {error && (
              <p className="text-center fw-bold text-danger fs-3">{error}</p>
            )}
          </div>
        </div>
      </div>
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
              {pageOffSet + limit > totalItem ? totalItem : pageOffSet + limit}{" "}
              of {totalItem}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DataSensorPage;
