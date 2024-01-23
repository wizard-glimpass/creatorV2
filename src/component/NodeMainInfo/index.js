import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDownSelect from "../../common/DropDownSelect";
import "./nodeMainInfo.scss";
import { nodeType, shopExpensive, validateAndModifyData } from "../../util";
import {
  resetNodeInfo,
  updateNodeInfo,
  updateTripDataAdd,
} from "../../store/actions/updateNodeInfo";
import Carousel from "../../common/Carousel";
import { Link } from "react-router-dom";
import useOutsideTap from "../../hooks/useOutsideTap";
import Chips from "../../common/Chips";
import CheckpointIdentification from "../../common/CheckpointIdentification";

const NodeMainInfo = () => {
  const dispatch = useDispatch();
  const [shopAngle, setShopAngle] = useState();
  const [showDropdown, setSHowDropdown] = useState(false);
  const [showCheckpointModal, setShowCheckpointModal] = useState(false);
  const [shopAngleEditing, setShopAngleEditing] = useState(true);
  const nodeNameRef = useRef();
  const nodeAltNameRef = useRef();

  const { userAngle, currentFloor, currentNodeInfo, allNodeInfo } = useSelector(
    (state) => ({
      userAngle: state.userMomentReducer.angle,
      currentFloor: state.appMetaInfoReducer.currentFloor,
      currentNodeInfo: state.nodeInfoReducer,
      allNodeInfo: state.appMetaInfoReducer.allNodes,
    })
  );

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

  const filteredData = useMemo(
    () =>
      allNodeInfo.filter((item) =>
        item?.name?.toLowerCase()?.includes(nodeName?.toLowerCase())
      ),
    [allNodeInfo, nodeName]
  );

  console.log(filteredData, "manish");

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
    const temp = [...nodeNames];
    const tempo = [...nodeAltNames];
    temp.push(nodeName);
    const l = altName?.length > 0 ? altName : nodeName;
    tempo.push(l);

    const payloadData = {
      ...currentNodeInfo,
      nodeNames: temp,
      nodeAltName: tempo,
      floor: currentFloor,
      nodeType: nodeInfo.nodeType,
      shopAngle: shopAngle,
    };
    const { isValid, modifyData } = validateAndModifyData(payloadData);

    console.log(modifyData, "manish");

    dispatch(updateTripDataAdd(modifyData));
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
      nodeType: event.target.nodeTypee,
    }));
    dispatch(
      updateNodeInfo({
        nodeType: event.target.nodeTypee,
        floorDirection: event.target.floorDirection,
      })
    );
  };

  useEffect(() => {
    if (shopAngleEditing) {
      setShopAngle(userAngle);
    }
  }, [userAngle]);

  const onSaveNodeName = () => {
    setNodeInfo((prev) => ({
      ...prev,
      nodeNameEditing: false,
    }));
  };

  const onSaveNodeAltName = () => {
    setNodeInfo((prev) => ({
      ...prev,
      showAltName: false,
    }));
  };

  useOutsideTap(nodeNameRef, onSaveNodeName);
  useOutsideTap(nodeAltNameRef, onSaveNodeAltName);

  const handleChipClick = (item) => {
    console.log("Chip clicked:", item);
  };

  const parentCallback = (imageData) => {
    dispatch(updateNodeInfo({ imageUrl: imageData }));
    setShowCheckpointModal(false);
  };

  return (
    <>
      {/* <div onClick={saveShopAngle} className="user-angle-container">
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
      </div> */}
      {showCheckpointModal && (
        <CheckpointIdentification
          setShowCheckpointModal={setShowCheckpointModal}
          parentCallback={parentCallback}
        />
      )}
      {nodeNameEditing ? (
        <div className="user-angle-container">
          <span className="field-info">Node name</span>

          <input
            type="text"
            ref={nodeNameRef}
            placeholder="Enter node name"
            value={nodeName}
            onChange={(event) => {
              if (event.target.value) {
                setSHowDropdown(true);
              } else {
                setSHowDropdown(false);
              }
              setNodeInfo((prev) => ({
                ...prev,
                nodeName: event.target.value,
              }));
            }}
          />
          {showDropdown && (
            <ul>
              {filteredData.map((suggestion) => {
                if (suggestion.nearBy === null)
                  return (
                    <li
                      style={{ color: "black", fontSize: "15px" }}
                      key={suggestion}
                    >
                      {suggestion.altNode
                        ? suggestion.altNode
                        : suggestion.name}
                      <span className="align-right">{suggestion.floor}</span>
                    </li>
                  );

                return <></>;
              })}
            </ul>
          )}
        </div>
      ) : (
        <div
          className="user-angle-container"
          onClick={() => {
            setNodeInfo((prev) => ({
              ...prev,
              nodeNameEditing: true,
            }));
          }}
        >
          <span className="field-info">Node name</span>
          {nodeName}
        </div>
      )}
      {showAltName && (
        <div ref={nodeAltNameRef} className="user-angle-container">
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
        </div>
      )}
      {!showAltName && (
        <div
          className="user-angle-container"
          onClick={() => {
            setNodeInfo((prev) => ({
              ...prev,
              showAltName: true,
            }));
          }}
        >
          <span className="field-info">Node alternate name</span>
          {altName}
        </div>
      )}
      <div className="action-btn-container">
        {/* <button
          onClick={resetNodeMainInfoDataOnAddNearby}
          disabled={!nodeInfo.nodeName}
          className={`${
            !nodeInfo?.nodeName ? "disable" : ""
          } button button--secondary`}
        >
          Add node nearby
        </button> */}

        <button
          onClick={resetNodeMainInfoDataOnNextNode}
          disabled={!nodeInfo.nodeName}
          className={`${
            !nodeInfo?.nodeName ? "disable" : ""
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
      <Chips data={shopExpensive} onChipClick={handleChipClick} />
      <button
        onClick={() => {
          setShowCheckpointModal(true);
        }}
        className="button button--secondary"
      >
        Add Image
      </button>
      <Carousel direction="horizontal" items={currentNodeInfo.nodeNames} />
    </>
  );
};

export default NodeMainInfo;
