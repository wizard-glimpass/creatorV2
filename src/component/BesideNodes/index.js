import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BesideNodes = () => {
  const { sourceNode } = useSelector((state) => ({
    sourceNode: state.connectInfoReducer.sourceNode,
  }));
  const [besideNodes, setBesideNodes] = useState([]);

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

  return (
    <>
      {besideNodes.map((nodes) => {
        return (
          <div className="preview-node">
            <FontAwesomeIcon icon={faHome} size="3x" className="icon" />

            <p className="node-name">{nodes.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default BesideNodes;
