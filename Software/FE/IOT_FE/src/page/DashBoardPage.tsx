import Card from "../components/CardComponent";
import { Line } from "react-chartjs-2";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import dataSensorApi from "../services/dataSensorApi";
import Button from "../components/ButtonComponent";
import NarBar from "../components/NavBarComponent";
import { useEffect, useState } from "react";
import { useDeviceContext } from "../context/DeviceContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [light, setLight] = useState(0);
  const [labels, setLabels] = useState([]);
  const [temperatureList, setTemperatureList] = useState([]);
  const [humidityList, setHumidityList] = useState([]);
  const [lightList, setLightList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const { lightState, fanState, setDeviceState } = useDeviceContext();

  // Socket nhan trang thai thiet bi
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/api/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setIsConnected(true);

      client.subscribe("/topic/device", (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log(receivedMessage);
        setDeviceState(receivedMessage.deviceName, receivedMessage.action);
      });
      setStompClient(client);
    });

    return () => {
      if (isConnected) {
        client.disconnect();
        setIsConnected(false);
      }
    };
  }, [isConnected]);

  const sendMessage = (deviceName: string, state: string) => {
    try {
      const action = {
        deviceName: deviceName,
        action: state,
      };
      stompClient.send("/app/device", {}, JSON.stringify(action));
      console.log("Send message sucess");
    } catch (error) {
      alert("Something is wrong, please try later");
    }
  };

  //fetch data cho cai bang :v
  useEffect(() => {
    let interval = setInterval(() => {
      getData();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getData = async () => {
    setTimeout(async () => {
      try {
        let res = await dataSensorApi.getData4DashBoard(0, 5);
        if (res && res.content) {
          setTemperature(res.content[0].temperature);
          setHumidity(res.content[0].humidity);
          setLight(res.content[0].light);
          setLabels(res.content.map((data) => data.created_at).reverse());
          setTemperatureList(
            res.content.map((data) => data.temperature).reverse()
          );
          setHumidityList(res.content.map((data) => data.humidity).reverse());
          setLightList(res.content.map((data) => data.light).reverse());
          setIsLoading(false);
          setError(null);
        }
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    }, 500);
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

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        min: -10,
        max: 100,
        title: {
          display: true,
          text: "Temperature / Humidity",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        min: 0,
        max: 1000,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Light",
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Nhiệt độ",
        data: temperatureList,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Độ ẩm",
        data: humidityList,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Ánh sáng",
        data: lightList,
        borderColor: "#e6e918",
        backgroundColor: "#fafe05",
        yAxisID: "y1",
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <NarBar></NarBar>
      {error && <p className="text-center fw-bold text-danger fs-3">{error}</p>}
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <p className="fw-bold fs-1">Collecting data.....</p>
          </div>
        </div>
      )}
      {!isLoading && !error && (
        <div>
          <div className="container text-center">
            <div className="row">
              <div className="col-4">
                <div className="py-3">
                  <Card
                    heading="Nhiệt độ"
                    data={temperature.toString() + "°C"}
                    icon={<LiaTemperatureHighSolid></LiaTemperatureHighSolid>}
                    firstColor={defaultTempColor}
                    secondColor={secondTempColor}
                  ></Card>
                </div>
              </div>

              <div className="col-4">
                <div className="py-3">
                  <Card
                    heading="Độ ẩm"
                    data={humidity.toString() + "%"}
                    icon={<WiHumidity></WiHumidity>}
                    firstColor={defaultHumidColor}
                    secondColor={secondHumidColor}
                  ></Card>
                </div>
              </div>

              <div className="col-4">
                <div className="py-3">
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
            <div className="row ">
              <div className="col-8" style={{ height: "100%" }}>
                <Line options={options} data={data} />
              </div>
              <div className="col-4 mt-4 ">
                <div className="shadow  rounded">
                  <Button
                    name="Fan"
                    state={fanState}
                    onClick={() =>
                      sendMessage("quat", fanState === "on" ? "off" : "on")
                    }
                  ></Button>
                  <Button
                    name="Light"
                    state={lightState}
                    onClick={() => {
                      sendMessage("den", lightState === "on" ? "off" : "on");
                    }}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
