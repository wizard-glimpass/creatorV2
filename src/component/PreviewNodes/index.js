import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./previewNodes.scss";
import { showSnackbar } from "../../store/actions/snackBar";
import {
  resetNodeInfo,
  resetTripInfo,
} from "../../store/actions/updateNodeInfo";

const PreviewNodes = ({ disable = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripInfo } = useSelector((state) => ({
    tripInfo: state.tripInfoReducer,
  }));
  const createNodes = async () => {
    try {
      const requestOptions = {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripInfo),
      };
      const response = await fetch(
        "https://app.glimpass.com/graph/create-nodes",
        requestOptions
      );

      response.json().then((data) => {
        dispatch(showSnackbar("Nodes added successfully!", "success"));
        dispatch(resetTripInfo());
        dispatch(resetNodeInfo());
      });
    } catch (err) {
      dispatch(showSnackbar("This is a error!", "alert"));
    }
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
          </div>
        );
      })}
      <div className="action-btn-container">
        <button
          onClick={createNodes}
          className={`${disable ? "disable" : ""} button button--primary`}
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
