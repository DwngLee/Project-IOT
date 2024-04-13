import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import fan_off from "../image/fan-off.png";
import fan_on from "../image/fan-on.gif";
import blub_off from "../image/bulb-off.png";
import blub_on from "../image/bulb-on.png";
interface Props {
  name: string;
  state: string;
  onClick: () => void;
}

function Button({ name, state, onClick }: Props) {
  const [imgSrc, setImgSrc] = useState("");
  const [isOn, setIsOn] = useState(false);
  switch (name) {
    case "Fan":
      useEffect(() => {
        setImgSrc(state === "on" ? fan_on : fan_off);
        setIsOn(state === "on" ? true : false);
      }, [name, state]);
      break;
    case "Light":
      useEffect(() => {
        setImgSrc(state === "on" ? blub_on : blub_off);
        setIsOn(state === "on" ? true : false);
      }, [name, state]);
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100px" }}
      >
        <img
          src={imgSrc}
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
          onClick={onClick}
        >
          On
        </button>
        <button
          type="button"
          className={`btn ${isOn ? "btn-secondary" : "btn-danger"} col m-1`}
          onClick={onClick}
        >
          Off
        </button>
      </div>
    </Fragment>
  );
}

export default Button;
