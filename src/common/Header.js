import React, { useEffect } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNodeInfo } from "../store/actions/updateNodeInfo";

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
    <Link to="/">
      <h1>
        <span>G</span>limpass<small>creators</small>
      </h1>
    </Link>
  );
};
export default Header;
