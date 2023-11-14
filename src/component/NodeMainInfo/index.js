import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFileAlt,
  faAngleRight,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import DropDownSelect from "../../common/DropDownSelect";
import "./nodeMainInfo.scss";
import { nodeType } from "../../util";
import {
  resetNodeInfo,
  updateNodeInfo,
  updateTripDataAdd,
} from "../../store/actions/updateNodeInfo";
import Carousel from "../../common/Carousel";
import { Link } from "react-router-dom";

const NodeMainInfo = () => {
  const dispatch = useDispatch();
  const [shopAngle, setShopAngle] = useState();
  const [shopAngleEditing, setShopAngleEditing] = useState(true);

  const { userAngle, currentFloor, currentNodeInfo } = useSelector((state) => ({
    userAngle: state.userMomentReducer.angle,
    currentFloor: state.appMetaInfoReducer.currentFloor,
    currentNodeInfo: state.nodeInfoReducer,
  }));

  const [nodeInfo, setNodeInfo] = useState({
    nodeNames: [],
    nodeAltNames: [],
    nodeName: "",
    nodeNameEditing: true,
    showAltName: false,
    altName: "",
    nodeType: nodeType[0].value,
    nearbyNodeFlag: false,
  });
  const {
    nodeNames,
    nodeAltNames,
    nodeName,
    nodeNameEditing,
    showAltName,
    altName,
    nearbyNodeFlag,
  } = nodeInfo;

  const saveShopAngle = () => {
    setShopAngleEditing(false);
    dispatch(updateNodeInfo({ shopAngle: shopAngle }));
  };

  const resetNodeMainInfoDataOnAddNearby = () => {
    const temp = [...nodeNames];
    const tempo = [...nodeAltNames];
    temp.push(nodeName);
    const l = altName?.length > 0 ? altName : nodeName;
    tempo.push(l);
    dispatch(
      updateNodeInfo({
        nodeNames: temp,
        nodeAltName: tempo,
        floor: currentFloor,
        nodeType: nodeInfo.nodeType,
      })
    );
    setNodeInfo({
      nodeNames: temp,
      nodeAltNames: tempo,
      nodeName: "",
      nodeNameEditing: true,
      showAltName: false,
      altName: "",
      nearbyNodeFlag: true,
      nodeType: nodeInfo.nodeType,
    });
  };

  const resetNodeMainInfoDataOnNextNode = () => {
    dispatch(updateTripDataAdd(currentNodeInfo));
    dispatch(resetNodeInfo());
    setNodeInfo({
      nodeNames: [],
      nodeAltNames: [],
      nodeName: "",
      nodeNameEditing: true,
      showAltName: false,
      altName: "",
      nearbyNodeFlag: false,
      nodeType: nodeInfo.nodeType,
    });
  };

  const handleDropdownChange = (event) => {
    setNodeInfo((prev) => ({
      ...prev,
      nodeType: event.target.value,
    }));
    dispatch(
      updateNodeInfo({
        nodeType: event.target.value,
        floorDirection: event.target.floorDirection,
      })
    );
  };

  useEffect(() => {
    if (shopAngleEditing) {
      setShopAngle(userAngle);
    }
  }, [userAngle]);

  return (
    <>
      <div onClick={saveShopAngle} className="user-angle-container">
        {shopAngle}
        <span className="field-info">Current shop angle</span>
        <button className="action-icon">
          <FontAwesomeIcon
            onClick={(event) => {
              event.stopPropagation();
              setShopAngleEditing(true);
            }}
            icon={faRepeat}
          />
        </button>
      </div>
      {nodeNameEditing ? (
        <div className="user-angle-container">
          <span className="field-info">Node name</span>
          <button className="action-icon">
            <FontAwesomeIcon
              onClick={() => {
                setNodeInfo((prev) => ({
                  ...prev,
                  nodeNameEditing: false,
                }));
              }}
              icon={faAngleRight}
            />
          </button>
          <input
            type="text"
            placeholder="Enter node name"
            value={nodeName}
            onChange={(event) => {
              setNodeInfo((prev) => ({
                ...prev,
                nodeName: event.target.value,
              }));
            }}
          />
        </div>
      ) : (
        <div className="user-angle-container">
          <span className="field-info">Node name</span>
          {nodeName}
          <button className="action-icon">
            <FontAwesomeIcon
              onClick={() => {
                setNodeInfo((prev) => ({
                  ...prev,
                  showAltName: true,
                }));
              }}
              className="alt-icon"
              icon={faFileAlt}
            />
            <FontAwesomeIcon
              onClick={() => {
                setNodeInfo((prev) => ({
                  ...prev,
                  nodeNameEditing: true,
                }));
              }}
              icon={faEdit}
            />
          </button>
        </div>
      )}
      {showAltName && (
        <div className="user-angle-container">
          <span className="field-info">Node alternate name</span>
          <input
            type="text"
            placeholder="Enter alt node name"
            value={altName}
            onChange={(event) => {
              setNodeInfo((prev) => ({
                ...prev,
                altName: event.target.value,
              }));
            }}
          />
          <button className="action-icon">
            <FontAwesomeIcon
              onClick={() => {
                setNodeInfo((prev) => ({
                  ...prev,
                  showAltName: false,
                }));
              }}
              icon={faAngleRight}
            />
          </button>
        </div>
      )}
      {altName?.length > 0 && !showAltName && (
        <div className="user-angle-container">{altName}</div>
      )}
      <div className="action-btn-container">
        <button
          onClick={resetNodeMainInfoDataOnAddNearby}
          disabled={!nodeInfo.nodeName}
          className={`${
            !nodeInfo?.nodeName ? "disable" : ""
          } button button--secondary`}
        >
          Add node nearby
        </button>

        <button
          onClick={resetNodeMainInfoDataOnNextNode}
          disabled={nodeInfo.nodeName}
          className={`${
            nodeInfo?.nodeName || nodeInfo.nodeAltNames.length === 0
              ? "disable"
              : ""
          } button button--primary`}
        >
          Next node
        </button>
        <Link to="/preview-node">
          <button
            disabled={nodeInfo.nodeName}
            className={`${
              nodeInfo?.nodeName || nodeInfo.nodeAltNames.length !== 0
                ? "disable"
                : ""
            } button button--primary`}
          >
            Preview
          </button>
        </Link>
      </div>
      <div className="user-angle-container">
        <span className="field-info">Node sub type</span>
        <DropDownSelect
          defaultValue={nodeType[0].value}
          options={nodeType}
          onChange={handleDropdownChange}
        />
      </div>
      <Carousel direction="horizontal" items={currentNodeInfo.nodeNames} />
    </>
  );
};

export default NodeMainInfo;
