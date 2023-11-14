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
import "./editNodeMainInfo.scss";
import { nodeType } from "../../util";
import {
  updateNodeInfo,
  updateTripDataRemoveNearby,
} from "../../store/actions/updateNodeInfo";
import Carousel from "../../common/Carousel";
import { Link, useParams } from "react-router-dom";

const EditNodeMainInfo = ({ currentNodeInfo }) => {
  const [itemSelectedIndex, setItemSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const { nodeIndex } = useParams();
  const [shopAngle, setShopAngle] = useState(currentNodeInfo.shopAngle);
  const [shopAngleEditing, setShopAngleEditing] = useState(false);

  const { userAngle } = useSelector((state) => ({
    userAngle: state.userMomentReducer.angle,
  }));

  const [nodeInfo, setNodeInfo] = useState({
    ...currentNodeInfo,
    nodeName: currentNodeInfo.nodeNames[itemSelectedIndex],
    nodeNameEditing: false,
    showAltName: false,
    altName: currentNodeInfo.nodeAltName[itemSelectedIndex],
  });
  const {
    nodeNames,
    nodeAltNames,
    nodeName,
    nodeNameEditing,
    showAltName,
    altName,
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
      })
    );
    setNodeInfo({
      nodeNames: temp,
      nodeAltNames: tempo,
      nodeName: "",
      nodeNameEditing: true,
      showAltName: false,
      altName: "",
    });
  };

  const handleDropdownChange = (event) => {
    const tempNodeInfo = {
      ...currentNodeInfo,
      nodeType: event.target.value,
      floorDirection: event.target.floorDirection,
    };

    dispatch(
      updateTripDataRemoveNearby({ nodeInfo: tempNodeInfo, index: nodeIndex })
    );
  };

  const deleteItem = (index) => {
    const tempNodeInfo = { ...currentNodeInfo };
    // tempNodeInfo.node
    tempNodeInfo.nodeNames.splice(index, 1);
    tempNodeInfo.nodeAltName.splice(index, 1);
    dispatch(
      updateTripDataRemoveNearby({ nodeInfo: tempNodeInfo, index: nodeIndex })
    );
  };

  const onClickItem = (index) => {
    setItemSelectedIndex(index);
  };

  useEffect(() => {
    if (shopAngleEditing) {
      setShopAngle(userAngle);
    }
  }, [userAngle]);

  useEffect(() => {
    setNodeInfo((prev) => ({
      ...prev,
      nodeName: currentNodeInfo.nodeNames[itemSelectedIndex],
      altName: currentNodeInfo.nodeAltName[itemSelectedIndex],
    }));
  }, [itemSelectedIndex]);

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

                const tempNodeInfo = { ...currentNodeInfo };
                // tempNodeInfo.node
                tempNodeInfo.nodeNames[itemSelectedIndex] = nodeName;
                console.log(tempNodeInfo, "manish");
                dispatch(
                  updateTripDataRemoveNearby({
                    nodeInfo: tempNodeInfo,
                    index: nodeIndex,
                  })
                );
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
                const tempNodeInfo = { ...currentNodeInfo };
                // tempNodeInfo.node
                tempNodeInfo.nodeAltName[itemSelectedIndex] = altName;

                dispatch(
                  updateTripDataRemoveNearby({
                    nodeInfo: tempNodeInfo,
                    index: nodeIndex,
                  })
                );
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
          Update node
        </button>
        <Link to="/preview-node">
          <button className="button button--primary">Back</button>
        </Link>
      </div>
      <div className="user-angle-container">
        <span className="field-info">Node sub type</span>
        <DropDownSelect
          defaultValue={currentNodeInfo.nodeType}
          options={nodeType}
          onChange={handleDropdownChange}
        />
      </div>
      <Carousel
        direction="horizontal"
        showCrossIcon
        onClickCross={deleteItem}
        onClickItem={onClickItem}
        items={currentNodeInfo.nodeNames}
      />
    </>
  );
};

export default EditNodeMainInfo;
