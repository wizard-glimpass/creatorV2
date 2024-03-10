import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faHome,
  faUpload,
  faShoePrints,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showSnackbar } from "../../store/actions/snackBar";
import Modal from "../../common/Modal";
import ExpandableIcon from "../../common/ExpandableIcon";

const BesideNodes = ({ from }) => {
  const { sourceNode, userAngle } = useSelector((state) => ({
    sourceNode: state.connectInfoReducer.sourceNode,
    userAngle: state.userMomentReducer.angle,
  }));
  const [besideNodes, setBesideNodes] = useState([]);
  const [currNodeInfo, setCurrNodeInfo] = useState();
  const [text, setText] = useState("");
  const [stepsUpdateModal, setStepsUpdateModal] = useState(false);
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

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
      "https://application.glimpass.com/graph/get-beside-nodes",
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
        "https://application.glimpass.com/graph/update-connection",
        requestOptions
      );
      setText("");
      dispatch(showSnackbar("Updation done successfully!", "success"));
    } catch (err) {
      dispatch(showSnackbar("This is an error!", "alert"));
    }
  };
  const closeModal = () => {
    setStepsUpdateModal(false);
  };
  const updateTripPath = (node) => {
    const payload = {
      edgeId: node.edgeId,
      steps: node.steps,
      angle: userAngle || 130,
    };
    updateTripPathReq(payload);
  };
  const updateSteps = (node) => {
    const payload = {
      edgeId: node.edgeId,
      steps: Number(text),
      angle: node.angle,
    };
    updateTripPathReq(payload);
    closeModal();
  };

  const deleteConnection = async (node) => {
    const payload = {
      source: sourceNode?.nodeId,
      dest: node?._id,
    };

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      await fetch(
        "https://application.glimpass.com/graph/delete-connection",
        requestOptions
      );

      dispatch(showSnackbar("Deletion done successfully!", "success"));
      getBesideNodes();
    } catch (err) {
      dispatch(showSnackbar("This is an error!", "alert"));
    }
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
                &ensp;
                <ExpandableIcon>
                  <p
                    onClick={(e) => {
                      setStepsUpdateModal(true);
                      setText(nodes.steps);
                      setCurrNodeInfo(nodes);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShoePrints}
                      size="1x"
                      className="icon"
                    />
                  </p>
                  <p
                    onClick={(e) => {
                      updateTripPath(nodes);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUpload}
                      size="1x"
                      className="icon"
                    />
                  </p>
                  <p
                    onClick={(e) => {
                      deleteConnection(nodes);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="1x"
                      className="icon"
                    />
                  </p>
                </ExpandableIcon>
              </>
            )}
          </div>
        );
      })}

      <Modal isOpen={stepsUpdateModal} onClose={closeModal}>
        <input
          type="number"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter steps here"
        />
        <br />
        <button
          onClick={() => {
            updateSteps(currNodeInfo);
          }}
        >
          Confirm steps.
        </button>
      </Modal>
    </>
  );
};

export default BesideNodes;
