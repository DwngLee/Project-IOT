import { Fragment, ReactNode } from "react";
import "../custom/CardComponent.css";

interface Props {
  heading: string;
  data: string;
  icon: ReactNode;
  firstColor: string;
  secondColor: string;
  isAlert: boolean;
}

function Card({
  heading,
  data,
  icon,
  firstColor,
  secondColor,
  isAlert,
}: Props) {
  return (
    <Fragment>
      <div
        className={`py-1 text-center shadow bg-body-tertiary rounded ${
          isAlert ? "alert" : ""
        }`}
        style={
          isAlert
            ? {}
            : {
                backgroundImage: `linear-gradient(45deg, ${firstColor}, ${secondColor})`,
              }
        }
      >
        <p className="fw-bold fs-4 m-0">
          {heading}
          <span className="">{icon}</span>
        </p>
        <p className="fs-5 m-1">{data}</p>
      </div>
    </Fragment>
  );
}
export default Card;
