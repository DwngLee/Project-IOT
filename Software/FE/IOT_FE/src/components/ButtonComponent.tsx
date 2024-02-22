import { format } from "date-fns";
import { Fragment, useState } from "react";

interface Props {
  stateOn: string;
  stateOff: string;
  deviceName: string;
}

const URL = "http://localhost:8080/api/actions";

function Button({ stateOn, stateOff, deviceName }: Props) {
  const [imgState, selectdState] = useState(stateOff);
  const [isOn, setIsOn] = useState(false);

  const sendDataToServer = (action: string) => {
    const formattedTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const data = {
      deviceName: deviceName,
      action: action,
      time: formattedTime,
    };

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
