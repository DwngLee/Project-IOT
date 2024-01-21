import { Fragment } from "react";
import { LiaTemperatureHighSolid } from "react-icons/lia";

interface Props {
  heading: string;
  data: string;
}

function Card({ heading, data }: Props) {
  return (
    <Fragment>
      <p className="fw-bold fs-4">{heading}</p>
      <p className="fs-5">{data}</p>
    </Fragment>
  );
}

export default Card;
