// Snackbar.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./snackBar.scss";
import { hideSnackbar } from "../../store/actions/snackBar";

const Snackbar = () => {
  const snackbar = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (snackbar.visible) {
      setTimeout(() => {
        dispatch(hideSnackbar());
      }, 3000); // Hide after 3 seconds
    }
  }, [snackbar.visible, dispatch]);

  if (!snackbar.visible) return null;

  const className = `snackbar ${snackbar.type}`;

  return <div className={className}>{snackbar.message}</div>;
};

export default Snackbar;
