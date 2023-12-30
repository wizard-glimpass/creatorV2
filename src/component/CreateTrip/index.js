import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../common/SearchBox";
import { getAllNodesAction } from "../../store/actions/appMetaInfo";
import "./createTrip.scss";
import Modal from "../../common/Modal";
import {
  resetConnections,
  updateCurrentSource,
  updateDestinationNode,
} from "../../store/actions/connectionInfo";
import { updateUserMoment } from "../../store/actions/userMoment";
import {
  resetTripInfo,
  updateTripDataAdd,
} from "../../store/actions/updateNodeInfo";
import BesideNodes from "../BesideNodes";
import { Link } from "react-router-dom";
import GifSlideshow from "../../common/GifSlideshow";
import CheckpointIdentification from "../../common/CheckpointIdentification";

export const CreateTrip = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showCheckpointModal, setShowCheckpointModal] = useState(false);
  const [showBesideNodes, setShowBesideNodes] = useState(false);
  const [connectNodeModal, setConnectNodeModal] = useState(false);
  const [sourceNodeEdit, setSourceNodeEdit] = useState(false);
  const [finalSteps, setFinalSteps] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  const {
    userAngle,
    userSteps,
    allNodesData,
    connectionInfo,
    resetSteps,
    tripInfo,
  } = useSelector(state => ({
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        market: window.sessionStorage.getItem("marketVal"),
      }),
    };
    const response = await fetch(
      `https://app.glimpass.com/graph/get-all-nodes-by-market`,
      requestOptions
    );

    response.json().then(data => {
      const allNodesData = [];
      Object.keys(data).map(d => {
        allNodesData.push(data[d]);
      });
      dispatch(getAllNodesAction(allNodesData));
    });
  };

  useEffect(() => {
    getAllNodes();
  }, []);

  useEffect(() => {
    setFinalSteps(userSteps);
  }, [userSteps]);

  const calculateAverageAngle = () => {
    const { angleSum: alphaSum, interval: alphaReadingsCounted } =
      averageAngleData;
    const avgX = alphaSum.cosAlphaSum / alphaReadingsCounted;
    const avgY = alphaSum.sinAlphaSum / alphaReadingsCounted;
    const avgAngle = (Math.atan2(avgY, avgX) * (180 / Math.PI) + 360) % 360;
    setAverageAngleData(prev => ({
      ...prev,
      averageAngle: parseInt(avgAngle),
    }));
  };

  useEffect(() => {
    setAverageAngleData(prevAngle => {
      let sumX = prevAngle.angleSum.cosAlphaSum;
      let sumY = prevAngle.angleSum.sinAlphaSum;
      let interval = prevAngle.interval + 1;

      sumX += Math.cos(userAngle * (Math.PI / 180));
      sumY += Math.sin(userAngle * (Math.PI / 180));

      return { angleSum: { sinAlphaSum: sumY, cosAlphaSum: sumX }, interval };
    });
    calculateAverageAngle();
  }, [userSteps]);

  const onSelect = selectedOption => {
    handleClose();
    setSourceNodeEdit(false);
    dispatch(updateCurrentSource(selectedOption));
    // dispatch(updateTripDataAdd(selectedOption));
  };

  return (
    <div className="create-trip-container">
      <button
        onClick={() => {
          setAverageAngleData({
            angleSum: { sinAlphaSum: 0, cosAlphaSum: 0 },
            interval: 0,
            averageAngle: 0,
          });
          setOpen(true);
        }}
        className="button button--primary"
      >
        Reset steps and angle
      </button>
      <Modal
        isOpen={connectNodeModal}
        onClose={() => {
          setConnectNodeModal(false);
        }}
      >
        {connectionInfo?.sourceNode?.name}
        <div>.</div>
        <input
          type="text"
          value={finalSteps}
          onChange={e => {
            setFinalSteps(e.target.value);
          }}
        />
        {averageAngleData.averageAngle}
        <div>.</div>
        {connectionInfo?.destinationNode?.name}
        <button
          className="button button--primary"
          onClick={() => {
            if (tripInfo.length === 0) {
              dispatch(updateTripDataAdd(connectionInfo.sourceNode));
            }
            dispatch(
              updateTripDataAdd({
                label: "RELATED_TO",
                steps: finalSteps,
                angle: averageAngleData.averageAngle,
              })
            );

            dispatch(updateTripDataAdd(connectionInfo.destinationNode));

            dispatch(updateCurrentSource(connectionInfo.destinationNode));
            dispatch(updateUserMoment({ resetSteps: !resetSteps }));

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
      <Modal isOpen={open} onClose={handleClose}>
        <GifSlideshow
          requestPermission={() => {
            dispatch(updateUserMoment({ resetSteps: !resetSteps }));
            setOpen(false);
            delete window.calibrateOffset;
          }}
        />
      </Modal>
      {showCheckpointModal && (
        <CheckpointIdentification
          setShowCheckpointModal={setShowCheckpointModal}
        />
      )}
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
      {sourceNodeEdit ? (
        <SearchBox onSelect={onSelect} type="Source" data={allNodesData} />
      ) : (
        <div
          onClick={() => {
            setSourceNodeEdit(true);
          }}
          className="user-angle-container"
        >
          <span className="field-info">Current source node</span>
          {connectionInfo?.sourceNode?.name}
        </div>
      )}

      <div className="user-angle-container">
        <span className="field-info">Current angle</span>
        {userAngle}
      </div>
      <div className="angle-floor-container">
        <div className="user-angle-container">
          {averageAngleData.averageAngle}
          <span className="field-info">Average angle</span>
        </div>

        <div className="user-angle-container">
          <span className="field-info">Total steps</span>
          {userSteps}
        </div>
      </div>

      <SearchBox
        onSelect={selectedOption => {
          handleClose();
          dispatch(updateDestinationNode(selectedOption));
          setConnectNodeModal(true);
        }}
        type="Destination"
        data={allNodesData}
      />

      <button
        onClick={() => {
          setShowCheckpointModal(true);
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
      <button className="button button--primary">
        <Link to="/preview-trip">Preview trip</Link>
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
