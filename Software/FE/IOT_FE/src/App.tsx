import Card from "./components/Card";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import sourceData from "./data/sourceData.json";

function App() {
  return (
    <>
      <div className="container px-4 text-center shadow bg-body-tertiary rounded mt-4">
        <div className="row gx-5">
          <div className="col">
            <div className="p-3">
              <Card heading="Nhiệt độ" data="24&#8451;"></Card>
            </div>
          </div>

          <div className="col">
            <div className="p-3">
              <Card heading="Độ ẩm" data="80%"></Card>
            </div>
          </div>

          <div className="col">
            <div className="p-3">
              <Card heading="Ánh sáng" data="72 lux"></Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-2 shadow bg-body-tertiary rounded mt-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label fs-4">Đèn</label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label fs-4">Quạt</label>
            </div>
          </div>

          <div className="col-10">
            <Line
              data={{
                labels: sourceData.map((data) => data.lable),
                datasets: [
                  {
                    label: "Nhiet do",
                    data: sourceData.map((data) => data.nhietdo),
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                  {
                    label: "Do am",
                    data: sourceData.map((data) => data.doam),
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                  {
                    label: "Anh sang",
                    data: sourceData.map((data) => data.anhsang),
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                ],
              }}
            ></Line>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
