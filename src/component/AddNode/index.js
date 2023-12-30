import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "./addNode.scss";
import { changeFloor } from "../../store/actions/appMetaInfo";
import NodeMainInfo from "../NodeMainInfo";
import useOutsideTap from "../../hooks/useOutsideTap";

export const AddNode = () => {
  const dispatch = useDispatch();
  const floorValueRef = useRef();
  const { userAngle, currentFloor } = useSelector((state) => ({
    userAngle: state.userMomentReducer.angle,
    currentFloor: state.appMetaInfoReducer.currentFloor,
  }));

  const [floorValue, setFloorValue] = useState(currentFloor);

  const [floorEditing, setFloorEditing] = useState(false);

  const onChangeFloorValue = () => {
    setFloorEditing(false);
    dispatch(changeFloor(floorValue));
  };

  useOutsideTap(floorValueRef, onChangeFloorValue);

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
            <button onClick={onChangeFloorValue} className="action-icon">
              <FontAwesomeIcon icon={faClose} />
            </button>
            <input
              type="text"
              ref={floorValueRef}
              value={floorValue}
              onChange={(event) => {
                setFloorValue(event.target.value);
              }}
            />
          </div>
        ) : (
          <div
            onClick={() => {
              setFloorEditing(true);
            }}
            className="user-angle-container"
          >
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
