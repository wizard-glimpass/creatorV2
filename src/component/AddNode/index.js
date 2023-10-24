import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "./addNode.scss";
import { changeFloor } from "../../store/actions/appMetaInfo";
import NodeMainInfo from "../NodeMainInfo";

export const AddNode = () => {
  const dispatch = useDispatch();
  const { userAngle, currentFloor } = useSelector((state) => ({
    userAngle: state.userMomentReducer.angle,
    currentFloor: state.appMetaInfoReducer.currentFloor,
  }));

  const [floorValue, setFloorValue] = useState(currentFloor);

  const [floorEditing, setFloorEditing] = useState(false);

  return (
    <>
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
                dispatch(changeFloor(floorValue));
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
            {currentFloor}
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

      <NodeMainInfo />
    </>
  );
};
