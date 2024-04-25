import { Fragment, useState, useEffect } from "react";
import fan_off from "../image/fan-off.png";
import fan_on from "../image/fan-on.gif";
import blub_off from "../image/bulb-off.png";
import blub_on from "../image/bulb-on.png";
import Switch from "react-switch";
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
    case "Light2":
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
        style={{ height: "140px", paddingBottom: "25px" }}
      >
        <img
          src={imgSrc}
          className="img-fluid"
          style={{
            height: "100%",
            width: "auto",
          }}
          alt=""
        />
      </div>
      <div className="d-flex justify-content-center mb-2">
        <Switch onChange={onClick} checked={isOn} />
      </div>
    </Fragment>
  );
}

export default Button;
