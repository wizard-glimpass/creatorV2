import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import "./editNode.scss";
import EditNodeMainInfo from "../EditNodeMainInfo";
import { updateTripDataRemoveNearby } from "../../store/actions/updateNodeInfo";

export const EditNode = () => {
  const { nodeIndex } = useParams();
  const dispatch = useDispatch();
  const { userAngle, tripInfo } = useSelector((state) => ({
    userAngle: state.userMomentReducer.angle,
    tripInfo: state.tripInfoReducer,
  }));

  const currentNodeInfo = useMemo(() => {
    return tripInfo[nodeIndex] || {};
  }, [tripInfo, nodeIndex]);

  const [floorValue, setFloorValue] = useState(currentNodeInfo.floor);

  const [floorEditing, setFloorEditing] = useState(false);

  return (
    <>
      <div className="edit-mode-container">
        <div className="blinking-circle" />
        <span className="content">Edit mode ON</span>
      </div>
      <div className="angle-floor-container">
        <div className="user-angle-container">
          {userAngle}
          <span className="field-info">Angle</span>
        </div>
        {floorEditing ? (
          <div className="user-angle-container">
            <span className="field-info">Selected floor</span>
            <button
              onClick={() => {
                setFloorEditing(false);
                const tempNodeInfo = {
                  ...currentNodeInfo,
                  floor: floorValue,
                };
                dispatch(
                  updateTripDataRemoveNearby({
                    nodeInfo: tempNodeInfo,
                    index: nodeIndex,
                  })
                );
              }}
              className="action-icon"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <input
              type="text"
              value={floorValue}
              onChange={(event) => {
                setFloorValue(event.target.value);
              }}
            />
          </div>
        ) : (
          <div className="user-angle-container">
            <span className="field-info">Selected floor</span>
            {currentNodeInfo.floor}
            <button
              onClick={() => {
                setFloorEditing(true);
              }}
              className="action-icon"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        )}
      </div>

      <EditNodeMainInfo currentNodeInfo={currentNodeInfo} />
    </>
  );
};
