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
import "./adminEditNodeMainInfo.scss";
import { getAllNodesAction } from "../../store/actions/appMetaInfo";
import { nodeType } from "../../util";
import { updateNodeInfo } from "../../store/actions/updateNodeInfo";
import { Link } from "react-router-dom";
import { showSnackbar } from "../../store/actions/snackBar";

const AdminEditNodeMainInfo = ({ currentNodeInfo }) => {
  console.log(currentNodeInfo, "manish");
  const dispatch = useDispatch();
  const [shopAngle, setShopAngle] = useState(currentNodeInfo.shopAngle);
  const [shopAngleEditing, setShopAngleEditing] = useState(false);

  const { userAngle } = useSelector(state => ({
    userAngle: state.userMomentReducer.angle,
  }));

  const [nodeInfo, setNodeInfo] = useState({
    ...currentNodeInfo,
    nodeNameEditing: false,
    showAltName: false,
  });
  useEffect(() => {
    setNodeInfo({
      ...nodeInfo,
      ...currentNodeInfo,
    });
  }, [currentNodeInfo]);
  const { name, nodeNameEditing, showAltName, altNode } = nodeInfo;
  console.log(nodeInfo, "manish");

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

  const saveShopAngle = () => {
    setShopAngleEditing(false);
    dispatch(updateNodeInfo({ shopAngle: shopAngle }));
  };

  const handleDropdownChange = event => {
    const tempNodeInfo = {
      ...currentNodeInfo,
      nodeType: event.target.nodeTypee,
      floorDirection: event.target.floorDirection,
    };

    dispatch(updateNodeInfo(tempNodeInfo));
  };

  useEffect(() => {
    if (shopAngleEditing) {
      setShopAngle(userAngle);
    }
  }, [userAngle]);

  const updateShopAngleReq = async payload => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      await fetch(
        "https://app.glimpass.com/graph/create-nodes",
        requestOptions
      );

      dispatch(showSnackbar("Updation done successfully!", "success"));
      getAllNodes();
    } catch (err) {
      dispatch(showSnackbar("This is an error!", "alert"));
    }
  };

  const updateShopAngle = node => {
    console.log(node, "test");
    const payload = [
      {
        ...node,
        nodeNames: [node.name],
        nodeAltName: [node.altNode],
        shopAngle: shopAngle || 12,
      },
    ];

    updateShopAngleReq(payload);
  };

  return (
    <>
      <div onClick={saveShopAngle} className="user-angle-container">
        {shopAngle}
        <span className="field-info">Current shop angle</span>
        <button className="action-icon">
          <FontAwesomeIcon
            onClick={event => {
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
                setNodeInfo(prev => ({
                  ...prev,
                  nodeNameEditing: false,
                }));

                const tempNodeInfo = { ...currentNodeInfo };
                // tempNodeInfo.node
                tempNodeInfo.name = name;

                dispatch(updateNodeInfo(tempNodeInfo));
              }}
              icon={faAngleRight}
            />
          </button>
          <input
            type="text"
            placeholder="Enter node name"
            value={name}
            onChange={event => {
              setNodeInfo(prev => ({
                ...prev,
                name: event.target.value,
              }));
            }}
          />
        </div>
      ) : (
        <div className="user-angle-container">
          <span className="field-info">Node name</span>
          {name}
          <button className="action-icon">
            <FontAwesomeIcon
              onClick={() => {
                setNodeInfo(prev => ({
                  ...prev,
                  showAltName: true,
                }));
              }}
              className="alt-icon"
              icon={faFileAlt}
            />
            <FontAwesomeIcon
              onClick={() => {
                setNodeInfo(prev => ({
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
            value={altNode}
            onChange={event => {
              setNodeInfo(prev => ({
                ...prev,
                altNode: event.target.value,
              }));
            }}
          />
          <button className="action-icon">
            <FontAwesomeIcon
              onClick={() => {
                setNodeInfo(prev => ({
                  ...prev,
                  showAltName: false,
                }));
                const tempNodeInfo = { ...currentNodeInfo };
                // tempNodeInfo.node
                tempNodeInfo.altNode = altNode;

                dispatch(updateNodeInfo(tempNodeInfo));
              }}
              icon={faAngleRight}
            />
          </button>
        </div>
      )}
      {altNode?.length > 0 && !showAltName && (
        <div className="user-angle-container">{altNode}</div>
      )}
      <div className="action-btn-container">
        <Link to="/validate-angles">
          <button className="button button--primary">Back</button>
        </Link>

        <button
          onClick={() => {
            updateShopAngle(currentNodeInfo);
          }}
          className="button button--primary"
        >
          Update
        </button>
      </div>
      <div className="user-angle-container">
        <span className="field-info">Node sub type</span>
        <DropDownSelect
          defaultValue={currentNodeInfo.nodeType}
          floorDirection={currentNodeInfo.floorDirection}
          options={nodeType}
          onChange={handleDropdownChange}
        />
      </div>
    </>
  );
};

export default AdminEditNodeMainInfo;
