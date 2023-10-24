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
    </>
  );
};

export default PreviewNodes;
