import React, { useEffect } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNodeInfo } from "../store/actions/updateNodeInfo";

import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!window.sessionStorage.getItem("marketVal")) {
      navigate("/market-selection");
    } else {
      dispatch(
        updateNodeInfo({ market: window.sessionStorage.getItem("marketVal") })
      );
    }
  }, []);
  return (
    <div className="header-container">
      <Link to="/">
        <h1>
          <span>G</span>limpass<small>creators</small>
        </h1>
      </Link>
      <span
        onClick={() => {
          navigate("/market-selection");
        }}
      >
        <FontAwesomeIcon icon={faMapPin} size="1x" className="icon" />
        <span className="market-selection-name ellipsis">
          {window.sessionStorage.getItem("marketVal")}
        </span>
      </span>
    </div>
  );
};
export default Header;
