import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./previewNodes.scss";

const PreviewNodes = () => {
  const navigate = useNavigate();
  const { tripInfo } = useSelector((state) => ({
    tripInfo: state.tripInfoReducer,
  }));
  const createNodes = async () => {
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
      console.log(data, "manish");
    });
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
        <button onClick={createNodes} className="button button--secondary">
          Add node nearby
        </button>
      </div>
    </>
  );
};

export default PreviewNodes;
