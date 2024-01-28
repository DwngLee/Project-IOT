import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NarBar() {
  return (
    <Fragment>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link fw-bold">
            DashBoard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/datasensor" className={`nav-link fw-bold`}>
            Data Sensor
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/actionhistory" className="nav-link fw-bold">
            Action History
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" className={`nav-link fw-bold`}>
            About
          </NavLink>
        </li>
      </ul>
    </Fragment>
  );
}

export default NarBar;
