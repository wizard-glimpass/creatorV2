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
import { nodeSubType } from "../../util";
import {
  resetNodeInfo,
  updateNodeInfo,
  updateTripData,
} from "../../store/actions/updateNodeInfo";
import Carousel from "../../common/Carousel";
import { Link } from "react-router-dom";

const carouselData = [
  { content: "This is slide 1" },
  { content: "This is slide 2" },
  { content: "This is slide 3" },
  { content: "This is slide 1" },
  { content: "This is slide 2" },
  { content: "This is slide 3" },
  { content: "This is slide 1" },
  { content: "This is slide 2" },
  { content: "This is slide 3" },
  // ... add as many items as needed
];

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
    });
  };

  const resetNodeMainInfoDataOnNextNode = () => {
    dispatch(updateTripData(currentNodeInfo));
    dispatch(resetNodeInfo());
    setNodeInfo({
      nodeNames: [],
      nodeAltNames: [],
      nodeName: "",
      nodeNameEditing: true,
      showAltName: false,
      altName: "",
      nearbyNodeFlag: false,
    });
  };

  const handleDropdownChange = (value) => {
    dispatch(updateNodeInfo({ nodeSubtype: value }));
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
          className="button button--secondary"
        >
          Add node nearby
        </button>

        <button
          onClick={resetNodeMainInfoDataOnNextNode}
          className="button button--primary"
        >
          Next node
        </button>
        <Link to="/preview-node">
          <button className="button button--primary">Preview</button>
        </Link>
      </div>
      <div className="user-angle-container">
        <span className="field-info">Node sub type</span>
        <DropDownSelect
          defaultValue={nodeSubType[0].value}
          options={nodeSubType}
          onChange={handleDropdownChange}
        />
      </div>
      <Carousel direction="horizontal" items={currentNodeInfo.nodeNames} />
    </>
  );
};

export default NodeMainInfo;
