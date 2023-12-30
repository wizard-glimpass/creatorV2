import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faHome, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showSnackbar } from "../../store/actions/snackBar";

const BesideNodes = ({ from }) => {
  const { sourceNode, userAngle } = useSelector((state) => ({
    sourceNode: state.connectInfoReducer.sourceNode,
    userAngle: state.userMomentReducer.angle,
  }));
  const [besideNodes, setBesideNodes] = useState([]);
  const dispatch = useDispatch();

  const getBesideNodes = async () => {
    const payload = {
      startNodeId: sourceNode.nodeId,
    };
    const requestOptions = {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      "https://app.glimpass.com/graph/get-beside-nodes",
      requestOptions
    );

    response.json().then((data) => {
      console.log(data, "manish");
      setBesideNodes(data);
    });
  };
  useEffect(() => {
    getBesideNodes();
  }, []);
  const updateTripPathReq = async (payload) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      await fetch(
        "https://app.glimpass.com/graph/update-connection",
        requestOptions
      );
      dispatch(showSnackbar("Updation done successfully!", "success"));
    } catch (err) {
      dispatch(showSnackbar("This is an error!", "alert"));
    }
  };
  const updateTripPath = (node) => {
    const payload = {
      edgeId: node.edgeId,
      steps: node.steps,
      angle: userAngle || 100,
    };
    updateTripPathReq(payload);
  };

  return (
    <>
      {from === "validateTrip" && (
        <div className="preview-node">
          <p className="node-name">{sourceNode.name}</p>
          <span>{sourceNode.shop_angle}</span>
          &emsp;
          <span>{sourceNode.floor}</span>
        </div>
      )}
      {besideNodes.map((nodes) => {
        return (
          <div className="preview-node">
            <FontAwesomeIcon icon={faHome} size="3x" className="icon" />

            <p className="node-name">{nodes.name}</p>
            {from === "validateTrip" && (
              <>
                <span>{nodes.angle}</span>
                <span
                  onClick={(e) => {
                    updateTripPath(nodes);
                  }}
                  className="close-btn"
                >
                  <FontAwesomeIcon icon={faUpload} size="1x" className="icon" />
                </span>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default BesideNodes;
