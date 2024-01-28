import { Fragment, useState } from "react";

interface Props {
  stateOn: string;
  stateOff: string;
}

function Button({ stateOn, stateOff }: Props) {
  const [imgState, selectdState] = useState(stateOff);
  return (
    <Fragment>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100px" }}
      >
        <img
          src={imgState}
          className="img-fluid mt-4"
          alt="Light Bulb"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            height: "100%",
            width: "auto",
          }}
        />
      </div>
      <div className="row p-4">
        <button
          type="button"
          className="btn btn-primary col m-1"
          onClick={() => {
            selectdState(stateOn);
          }}
        >
          On
        </button>
        <button
          type="button"
          className="btn btn-danger col m-1"
          onClick={() => {
            selectdState(stateOff);
          }}
        >
          Off
        </button>
      </div>
    </Fragment>
  );
}

export default Button;
