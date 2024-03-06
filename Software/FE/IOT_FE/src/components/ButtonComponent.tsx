import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { ActionHistory } from "../class/ActionHistory";

interface Props {
  stateOn: string;
  stateOff: string;
  lastState: ActionHistory;
}

const actionURL = "http://localhost:8080/api/actions";

function Button({ stateOn, stateOff, lastState }: Props) {
  const [imgState, selectdState] = useState(stateOff);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (lastState && lastState.action === "on") {
      selectdState(stateOn);
      setIsOn(true);
    }
  }, [lastState]); // Trigger useEffect when lastState changes

  const sendDataToServer = (action: string) => {
    const data = {
      deviceName: lastState.deviceName,
      action: action,
    };

    axios
      .post(actionURL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleButtonClick = (action: string, state: string) => {
    setIsOn(action === "on");
    selectdState(state);
    sendDataToServer(action);
  };

  return (
    <Fragment>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100px" }}
      >
        <img
          src={imgState}
          className="img-fluid mt-4"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "100%",
            width: "auto",
          }}
          alt=""
        />
      </div>
      <div className="row p-4">
        <button
          type="button"
          className={`btn ${isOn ? "btn-primary" : "btn-secondary"} col m-1`}
          onClick={() => handleButtonClick("on", stateOn)}
        >
          On
        </button>
        <button
          type="button"
          className={`btn ${isOn ? "btn-secondary" : "btn-danger"} col m-1`}
          onClick={() => handleButtonClick("off", stateOff)}
        >
          Off
        </button>
      </div>
    </Fragment>
  );
}

export default Button;
