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
import { Fragment } from "react";
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
  const temperature = 20;
  const hudmidity = 10;
  const light = 30;

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
    if (hudmidity < 15) {
      color = "#80b3ff";
    } else if (hudmidity >= 15 && hudmidity < 30) {
      color = "#0066ff";
    } else if (hudmidity >= 30) {
      color = "#003d99";
    }
    secondHumidColor = color;
  };

  const setLightColor = () => {
    let color = "#999900";
    if (light < 15) {
      color = "#999900";
    } else if (light >= 15 && light < 30) {
      color = "#cccc00";
    } else if (light >= 30) {
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
                data="24&#8451;"
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
                data="80%"
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
                data="72 lux"
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
            <Button stateOn={blub_on} stateOff={blub_off}></Button>

            <Button stateOn={fan_on} stateOff={fan_off}></Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
