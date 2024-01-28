import { Fragment } from "react";
import { Action, ActionHistory } from "../class/ActionHistory";
import { format } from "date-fns";
import NarBar from "../components/NavBarComponent";
import Table from "../components/TableComponent";

function renderActionRow(action: ActionHistory) {
  return (
    <>
      <td>{action.id}</td>
      <td>{action.deviceID}</td>
      <td>{action.action}</td>
      <td>{format(new Date(action.time), "HH:mm:ss - dd/MM/yyyy")}</td>
    </>
  );
}

const keys_search = ["id", "deviceID", "action", "time"];

const tableHeading = ["id", "Device ID", "Action", "Time"];

const randomString = ["Tắt đèn", "Bật đèn", "Tắt quạt", "Bật quạt"]; //delete this pls

function ActionHistoryPage() {
  const listData: ActionHistory[] = [];
  for (let i = 1; i <= 100; i++) {
    const randomAction = Math.floor(Math.random() * 4);
    const action: ActionHistory = {
      id: i.toString(),
      deviceID: "id00" + i,
      action: randomString[randomAction],
      time: new Date(),
    };
    listData.push(action);
  }
  return (
    <Fragment>
      <NarBar></NarBar>
      <Table
        title="Ation History"
        tableHeading={tableHeading}
        listData={listData}
        renderRow={renderActionRow}
        keys={keys_search}
      ></Table>
    </Fragment>
  );
}

export default ActionHistoryPage;
