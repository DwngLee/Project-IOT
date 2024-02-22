import { Fragment, useState, useEffect } from "react";
import NarBar from "../components/NavBarComponent";
import Table from "../components/TableComponent";
import DataSensor from "../class/DataSensor";
import { format } from "date-fns";
import { fetchDataSensor } from "../services/UserService";
import ReactPaginate from "react-paginate";
import DateTimeInput from "../components/DateTimeInputComponent";
import MultiRangeSlider from "../components/MultiRangeSlider";
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
      <div className="container">
        <p className="fw-bold fs-2 mt-2 mb-0">Data Sensor</p>
        <DateTimeInput
          onDatesChange={handleDate}
          startDate={startDate}
          endDate={endDate}
        ></DateTimeInput>
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
