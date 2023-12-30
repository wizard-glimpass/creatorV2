import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import "./adminEditNode.scss";
import AdminEditNodeMainInfo from "./AdminEditNodeMainInfo";
import { updateNodeInfo } from "../../store/actions/updateNodeInfo";
import { ADMIN_UPDATE } from "../../store/actionTypes";

export const AdminEditNode = () => {
  const { nodeId } = useParams();
  const dispatch = useDispatch();
  const { userAngle, allNodeInfo, currentNodeInfoWatch } = useSelector(
    state => ({
      userAngle: state.userMomentReducer.angle,
      allNodeInfo: state.appMetaInfoReducer?.allNodes || [],
      currentNodeInfoWatch: state.nodeInfoReducer,
    })
  );

  console.log(nodeId, "manish");

  useEffect(() => {
    const cuNode = allNodeInfo.find(
      nodeInfo => nodeInfo.nodeId === `nodes/${nodeId}`
    );
    dispatch(updateNodeInfo({ ...cuNode, from: ADMIN_UPDATE }));
  }, [allNodeInfo]);

  const [floorValue, setFloorValue] = useState(currentNodeInfoWatch.floor);

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
                dispatch(updateNodeInfo({ floor: floorValue }));
              }}
              className="action-icon"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <input
              type="text"
              value={floorValue}
              onChange={event => {
                setFloorValue(event.target.value);
              }}
            />
          </div>
        ) : (
          <div className="user-angle-container">
            <span className="field-info">Selected floor</span>
            {floorValue}
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

      <AdminEditNodeMainInfo currentNodeInfo={currentNodeInfoWatch} />
    </>
  );
};
