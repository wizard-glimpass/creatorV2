import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./previewTrip.scss";
import { showSnackbar } from "../../store/actions/snackBar";
import {
  resetNodeInfo,
  resetTripInfo,
} from "../../store/actions/updateNodeInfo";
import { resetConnections } from "../../store/actions/connectionInfo";

const PreviewTrip = ({ disable = false }) => {
  const [disableState, setDisableState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripInfo } = useSelector((state) => ({
    tripInfo: state.tripInfoReducer,
  }));

  // const confirmTrip = async () => {
  //   try {
  //     setDisableState(true);
  //     const resp = tripInfo;
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(resp),
  //     };
  //     await fetch("https://app.glimpass.com/graph/create", requestOptions);

  //     dispatch(showSnackbar("Trip added successfully!", "success"));
  //     dispatch(resetTripInfo());
  //     dispatch(resetConnections());
  //   } catch (err) {
  //     dispatch(showSnackbar("This is a error!", "alert"));
  //   } finally {
  //     setDisableState(false);
  //   }
  // };

  const confirmTrip = async () => {
    try {
      setDisableState(true);
      const resp = tripInfo;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resp),
      };
      const response = await fetch(
        "https://app.glimpass.com/graph/create",
        requestOptions
      );

      if (!response.ok) {
        // Check if response is outside 200-299 range
        const errorData = await response.json(); // Assuming the server responds with error details in JSON format
        const errorMessage =
          errorData.message || "An error occurred while adding the trip."; // Customize error message based on API response or use a default message
        throw new Error(errorMessage); // Throw error to be caught in catch block
      }

      dispatch(showSnackbar("Trip added successfully!", "success"));
      dispatch(resetTripInfo());
      dispatch(resetConnections());
    } catch (err) {
      // Use the error message from the thrown error or a generic error message
      dispatch(showSnackbar(err.message || "This is an error!", "alert"));
    } finally {
      setDisableState(false);
    }
  };

  console.log(tripInfo, "manish");
  return (
    <>
      {tripInfo.map((nodes, index) => {
        if (nodes?.nodeType === "checkpoint") {
          return (
            <div className="preview-node">
              <FontAwesomeIcon icon={faHome} size="3x" className="icon" />

              <p className="node-name">{JSON.stringify(nodes.name)}</p>
            </div>
          );
        } else if (nodes?.nodeType) {
          return (
            <div className="preview-node">
              <FontAwesomeIcon icon={faHome} size="3x" className="icon" />

              <p className="node-name">{nodes.name}</p>
            </div>
          );
        }
        return <></>;
      })}
      <div className="action-btn-container">
        <button
          onClick={confirmTrip}
          className={`${
            disable || disableState ? "disable" : ""
          } button button--primary`}
        >
          Add Trip to {window.sessionStorage.getItem("marketVal")}
        </button>
        <button
          className="button button--secondary"
          onClick={() => {
            navigate("/create-trip");
          }}
        >
          back
        </button>
      </div>
    </>
  );
};

export default PreviewTrip;
