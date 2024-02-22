import Card from "../components/CardComponent";
import { Line } from "react-chartjs-2";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import Button from "../components/ButtonComponent";
import fan_off from "../image/fan-off.png";
import fan_on from "../image/fan-on.gif";
import blub_off from "../image/bulb-off.png";
import blub_on from "../image/bulb-on.png";
import NarBar from "../components/NavBarComponent";
import { Fragment, useEffect, useState } from "react";
import { format, getDate } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { fetchDataSensor4DashBoard } from "../services/UserService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const labels = [
  "14:00:00",
  "14:00:05",
  "14:00:10",
  "14:00:15",
  "14:00:20",
  "14:00:25",
  "14:00:30",
];
const dataList1 = [10, 11, 12, 10, 28, 30, 30, 31];
const dataList2 = [12, 10, 11, 21, 12, 20, 11];
const dataList3 = [13, 11, 13, 21, 16, 23, 14];

export const data = {
  labels,
  datasets: [
    {
      label: "Nhiệt độ",
      data: dataList1,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.4,
    },
    {
      label: "Độ ẩm",
      data: dataList2,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.4,
    },
    {
      label: "Ánh sáng",
      data: dataList3,
      borderColor: "#e6e918",
      backgroundColor: "#fafe05",
      tension: 0.4,
    },
  ],
};

function Dashboard() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [light, setLight] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     getData();
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const getData = async () => {
    let res = await fetchDataSensor4DashBoard(0, 5);
    if (res && res.content) {
      console.log(">>>check: ", res);
      setTemperature(res.content[0].temperature);
      setHumidity(res.content[0].humidity);
      setLight(res.content[0].light);
    }
  };

  const defaultTempColor = "#ff6666";
  const defaultHumidColor = "#8080ff";
  const defaultLightColor = "#ffffff";

  let secondTempColor = "";
  let secondHumidColor = "";
  let secondLightColor = "";

  const setTemperatureColor = () => {
    let color = "#ff8080";
    if (temperature < 15) {
      color = "#ff8080";
    } else if (temperature >= 15 && temperature < 30) {
      color = "#ff0000";
    } else if (temperature >= 30) {
      color = " #990000";
    }
    secondTempColor = color;
  };

  const setHumidColor = () => {
    let color = "#80b3ff";
    if (humidity < 15) {
      color = "#80b3ff";
    } else if (humidity >= 15 && humidity < 30) {
      color = "#0066ff";
    } else if (humidity >= 30) {
      color = "#003d99";
    }
    secondHumidColor = color;
  };

  const setLightColor = () => {
    let color = "#999900";
    if (light < 300) {
      color = "#999900";
    } else if (light >= 300 && light < 600) {
      color = "#cccc00";
    } else if (light >= 600) {
      color = "#ffff00";
    }
    secondLightColor = color;
  };

  setTemperatureColor();
  setHumidColor();
  setLightColor();

  return (
    <>
      <NarBar></NarBar>
      <div className="container  text-center">
        <div className="row">
          <div className="col">
            <div className="p-3">
              <Card
                heading="Nhiệt độ"
                data={temperature.toString() + "°C"}
                icon={<LiaTemperatureHighSolid></LiaTemperatureHighSolid>}
                firstColor={defaultTempColor}
                secondColor={secondTempColor}
              ></Card>
            </div>
          </div>

          <div className="col">
            <div className="p-3">
              <Card
                heading="Độ ẩm"
                data={humidity.toString() + "%"}
                icon={<WiHumidity></WiHumidity>}
                firstColor={defaultHumidColor}
                secondColor={secondHumidColor}
              ></Card>
            </div>
          </div>

          <div className="col">
            <div className="p-3">
              <Card
                heading="Ánh sáng"
                data={light.toString() + " lux"}
                icon={<CiLight></CiLight>}
                firstColor={defaultLightColor}
                secondColor={secondLightColor}
              ></Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex">
          <div className="col-10" style={{ height: "100%" }}>
            <Line options={options} data={data} />
          </div>
          <div className="col-2 shadow bg-body-tertiary rounded mt-4">
            <Button
              stateOn={blub_on}
              stateOff={blub_off}
              deviceName="den"
            ></Button>

            <Button
              stateOn={fan_on}
              stateOff={fan_off}
              deviceName="quat"
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
