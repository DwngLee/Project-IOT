import { Fragment } from "react";
import NarBar from "../components/NavBarComponent";
import Table from "../components/TableComponent";
import DataSensor from "../class/DataSensor";
import { format } from "date-fns";

function renderSensorRow(sensor: DataSensor) {
  return (
    <>
      <td>{sensor.id}</td>
      <td>{sensor.temperature}</td>
      <td>{sensor.humidity}</td>
      <td>{sensor.light}</td>
      <td>{format(new Date(sensor.created_at), "HH:mm:ss - dd/MM/yyyy")}</td>
    </>
  );
}

function DataSensorPage() {
  const listData: DataSensor[] = [];
  for (let i = 1; i <= 100; i++) {
    const dataSensor: DataSensor = {
      id: i.toString(),
      temperature: 25.5 + i,
      humidity: 60 + i,
      light: 500 + i,
      created_at: new Date(),
    };
    listData.push(dataSensor);
  }

  const keys_search = ["id", "temperature", "humidity", "light", "created_at"];

  const tableHeading = ["id", "Temperature", "Humidity", "Light", "Created At"];
  return (
    <Fragment>
      <NarBar></NarBar>
      <Table
        title="Data Sensor"
        tableHeading={tableHeading}
        listData={listData}
        renderRow={renderSensorRow}
        keys={keys_search}
      ></Table>
    </Fragment>
  );
}

export default DataSensorPage;
