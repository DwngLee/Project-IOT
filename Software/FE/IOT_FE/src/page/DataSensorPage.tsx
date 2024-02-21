import { Fragment, useState, useEffect } from "react";
import NarBar from "../components/NavBarComponent";
import Table from "../components/TableComponent";
import DataSensor from "../class/DataSensor";
import { format } from "date-fns";
import { fetchDataSensor } from "../services/UserService";
import ReactPaginate from "react-paginate";
import DateTimeInput from "../components/DateTimeInputComponent";
import MultiRangeSlider from "../components/MultiRangeSlider";
import DataRange from "../components/DataRange";
import { debounce } from "lodash";

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

  useEffect(() => {
    getData(
      currentPage,
      limit,
      startDate,
      endDate,
      temperature,
      humidity,
      light
    );
  }, [limit, currentPage, startDate, endDate, temperature, humidity, light]);

  const getData = async (
    currentPage: number,
    limit: number,
    startDate: string,
    endDate: string,
    temperature: { min: number; max: number },
    humidity: { min: number; max: number },
    light: { min: number; max: number }
  ) => {
    let res = await fetchDataSensor(
      currentPage,
      limit,
      startDate,
      endDate,
      temperature,
      humidity,
      light
    );
    if (res && res.content) {
      console.log(">>>check: ", res);
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

      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="vstack gap-3 container p-0">
              <div className="my-4">
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
              <div className="my-4">
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
              <div className="my-4">
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
          </div>
        </div>
      </div>

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
