import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../common/SearchBox";
import { getAllNodesAction } from "../../store/actions/appMetaInfo";
import "./createTrip.scss";
import Modal from "../../common/Modal";
import {
  updateCurrentSource,
  updateDestinationNode,
} from "../../store/actions/connectionInfo";
import { updateUserMoment } from "../../store/actions/userMoment";
import { updateTripDataAdd } from "../../store/actions/updateNodeInfo";
import BesideNodes from "../BesideNodes";

export const CreateTrip = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [showBesideNodes, setShowBesideNodes] = useState(false);
  const [connectNodeModal, setConnectNodeModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [stepsEditing, setStepsEditing] = useState(false);
  const {
    userAngle,
    userSteps,
    allNodesData,
    connectionInfo,
    resetSteps,
    tripInfo,
  } = useSelector((state) => ({
    userAngle: state.userMomentReducer.angle,
    userSteps: state.userMomentReducer.steps,
    resetSteps: state.userMomentReducer.resetSteps,
    allNodesData: state.appMetaInfoReducer.allNodes,
    connectionInfo: state.connectInfoReducer,
    tripInfo: state.tripInfoReducer,
  }));

  const [averageAngleData, setAverageAngleData] = useState({
    angleSum: { sinAlphaSum: 0, cosAlphaSum: 0 },
    interval: 0,
    averageAngle: 0,
  });

  const getAllNodes = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `https://app.glimpass.com/graph/get-all-nodes?market=${window.marketSelection}`,
      requestOptions
    );

    response.json().then((data) => {
      const allNodesData = [];
      Object.keys(data).map((d) => {
        allNodesData.push(data[d]);
      });
      dispatch(getAllNodesAction(allNodesData));
    });
  };

  const confirmTrip = async () => {
    const resp = tripInfo;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resp),
    };
    await fetch("https://app.glimpass.com/graph/create", requestOptions);
  };

  useEffect(() => {
    getAllNodes();
  }, []);

  const calculateAverageAngle = () => {
    const { angleSum: alphaSum, interval: alphaReadingsCounted } =
      averageAngleData;
    const avgX = alphaSum.cosAlphaSum / alphaReadingsCounted;
    const avgY = alphaSum.sinAlphaSum / alphaReadingsCounted;
    const avgAngle = (Math.atan2(avgY, avgX) * (180 / Math.PI) + 360) % 360;
    setAverageAngleData((prev) => ({
      ...prev,
      averageAngle: parseInt(avgAngle),
    }));
  };

  useEffect(() => {
    setAverageAngleData((prevAngle) => {
      console.log(prevAngle, "manish");
      let sumX = prevAngle.angleSum.cosAlphaSum;
      let sumY = prevAngle.angleSum.sinAlphaSum;
      let interval = prevAngle.interval + 1;

      sumX += Math.cos(userAngle * (Math.PI / 180));
      sumY += Math.sin(userAngle * (Math.PI / 180));

      return { angleSum: { sinAlphaSum: sumY, cosAlphaSum: sumX }, interval };
    });
    calculateAverageAngle();
  }, [userSteps]);

  const onSelect = (selectedOption) => {
    console.log(selectedOption, "manish");
    handleClose();

    dispatch(updateCurrentSource(selectedOption));
    dispatch(updateTripDataAdd({ nodeId: selectedOption.nodeId }));
  };

  return (
    <div className="create-trip-container">
      <Modal isOpen={open} onClose={handleClose}>
        <SearchBox onSelect={onSelect} type="Source" data={allNodesData} />
      </Modal>
      <Modal
        isOpen={connectNodeModal}
        handleClose={() => {
          setConnectNodeModal(false);
        }}
      >
        {connectionInfo?.sourceNode?.name}
        <div>.</div>
        {userSteps} - {averageAngleData.averageAngle}
        <div>.</div>
        {connectionInfo?.destinationNode?.name}
        <button
          className="button button--primary"
          onClick={() => {
            dispatch(updateCurrentSource(connectionInfo.destinationNode));
            dispatch(updateUserMoment({ resetSteps: !resetSteps }));

            dispatch(
              updateTripDataAdd({
                nodeId: connectionInfo.destinationNode.nodeId,
                nodeName: connectionInfo.destinationNode.name,
              })
            );

            setConnectNodeModal(false);
            setAverageAngleData({
              angleSum: { sinAlphaSum: 0, cosAlphaSum: 0 },
              interval: 0,
              averageAngle: 0,
            });
          }}
        >
          connect
        </button>
      </Modal>
      {showBesideNodes && (
        <Modal
          isOpen
          onClose={() => {
            setShowBesideNodes(false);
          }}
        >
          <BesideNodes />
        </Modal>
      )}
      <div className="user-angle-container">
        <span className="field-info">Current source node</span>
        {connectionInfo?.sourceNode?.name}
      </div>
      <div className="user-angle-container">
        <span className="field-info">Current angle</span>
        {userAngle}
      </div>
      <div className="angle-floor-container">
        <div className="user-angle-container">
          {averageAngleData.averageAngle}
          <span className="field-info">Average angle</span>
        </div>
        {stepsEditing ? (
          <div className="user-angle-container">
            <span className="field-info">Total steps</span>
            <button
              onClick={() => {
                setStepsEditing(false);
                //   dispatch(changeFloor(floorValue));
              }}
              className="action-icon"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <input
              type="text"
              value={userSteps}
              onChange={(event) => {
                //   setFloorValue(event.target.value);
              }}
            />
          </div>
        ) : (
          <div className="user-angle-container">
            <span className="field-info">Total steps</span>
            {userSteps}
            <button
              onClick={() => {
                setStepsEditing(true);
              }}
              className="action-icon"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        )}
      </div>

      <SearchBox
        onSelect={(selectedOption) => {
          handleClose();
          dispatch(updateDestinationNode(selectedOption));
          setConnectNodeModal(true);
          dispatch(
            updateTripDataAdd({
              label: "RELATED_TO",
              steps: userSteps,
              angle: averageAngleData.averageAngle,
            })
          );
        }}
        type="Destination"
        data={allNodesData}
      />

      <button
        onClick={() => {
          dispatch(
            updateTripDataAdd({
              label: "RELATED_TO",
              steps: userSteps,
              angle: averageAngleData.averageAngle,
            })
          );

          dispatch(
            updateTripDataAdd({
              floor: connectionInfo.sourceNode?.floor,
              market: "test",
              name: new Date(),
              nodeType: "checkpoint",
            })
          );
          dispatch(updateUserMoment({ resetSteps: !resetSteps }));
          setAverageAngleData({
            angleSum: { sinAlphaSum: 0, cosAlphaSum: 0 },
            interval: 0,
            averageAngle: 0,
          });
        }}
        className="button button--secondary"
      >
        Add checkpoint
      </button>

      <button onClick={confirmTrip} className="button button--primary">
        Preview trip
      </button>
      <button
        onClick={() => {
          setShowBesideNodes(true);
        }}
        className="button button--primary"
      >
        Show beside nodes
      </button>
    </div>
  );
};

export default CreateTrip;
