import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/">
      <h1>
        <span>G</span>limpass<small>creators</small>
      </h1>
    </Link>
  );
};
export default Header;
