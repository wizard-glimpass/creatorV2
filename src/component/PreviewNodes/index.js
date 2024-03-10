import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./previewNodes.scss";
import { showSnackbar } from "../../store/actions/snackBar";
import {
  removeNodeInfo,
  resetNodeInfo,
  resetTripInfo,
} from "../../store/actions/updateNodeInfo";

const PreviewNodes = ({ disable = false }) => {
  const [disableState, setDisableState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripInfo } = useSelector((state) => ({
    tripInfo: state.tripInfoReducer,
  }));
  // const createNodes = async () => {
  //   try {
  //     setDisableState(true);
  //     const requestOptions = {
  //       method: "POST",

  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(tripInfo),
  //     };
  //     const response = await fetch(
  //       "https://application.glimpass.com/graph/create-nodes",
  //       requestOptions
  //     );

  //     response.json().then((data) => {
  //       console.log(data, "paras");
  //       dispatch(showSnackbar("Nodes added successfully!", "success"));
  //       dispatch(resetTripInfo());
  //       dispatch(resetNodeInfo());
  //     });
  //   } catch (err) {
  //     dispatch(showSnackbar("This is a error!", "alert"));
  //   } finally {
  //     setDisableState(false);
  //   }
  // };

  const createNodes = async () => {
    try {
      setDisableState(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripInfo),
      };
      const response = await fetch(
        "https://application.glimpass.com/graph/create-nodes",
        requestOptions
      );

      if (!response.ok) {
        // Check if response is outside 200-299 range
        const errorData = await response.json(); // Assuming the server responds with error details in JSON format
        const errorMessage =
          errorData.message || "An error occurred while adding nodes."; // Customize error message based on API response or use a default message
        throw new Error(errorMessage); // Throw error to be caught in catch block
      }

      response.json().then((data) => {
        console.log(data, "paras");
        dispatch(showSnackbar("Nodes added successfully!", "success"));
        dispatch(resetTripInfo());
        dispatch(resetNodeInfo());
      });
    } catch (err) {
      // Use the error message from the thrown error or a generic error message
      dispatch(showSnackbar(err.message || "This is an error!", "alert"));
    } finally {
      setDisableState(false);
    }
  };

  const removeNode = (index) => {
    dispatch(removeNodeInfo({ index, tripInfo }));
  };
  return (
    <>
      {tripInfo.map((nodes, index) => {
        return (
          <div className="preview-node">
            <FontAwesomeIcon icon={faHome} size="3x" className="icon" />

            <p
              className="node-name"
              onClick={() => {
                navigate(`/preview-node/edit/${index}`);
              }}
            >
              {nodes.nodeNames[0]}
            </p>
            <span
              onClick={() => {
                removeNode(index);
              }}
              className="close-btn"
            >
              <FontAwesomeIcon icon={faClose} size="1x" className="icon" />
            </span>
          </div>
        );
      })}
      <div className="action-btn-container">
        <button
          onClick={createNodes}
          className={`${
            disable || disableState ? "disable" : ""
          } button button--primary`}
        >
          Add nodes to {window.sessionStorage.getItem("marketVal")}
        </button>
        <button
          className="button button--secondary"
          onClick={() => {
            navigate("/add-node");
          }}
        >
          back
        </button>
      </div>
    </>
  );
};

export default PreviewNodes;
