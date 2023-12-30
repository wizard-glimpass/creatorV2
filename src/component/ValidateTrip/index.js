import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNodesAction } from "../../store/actions/appMetaInfo";
import "./validateTrip.scss";
import { showSnackbar } from "../../store/actions/snackBar";
import SearchBar from "../../common/SearchBar";
import BesideNodes from "../BesideNodes";
import { updateCurrentSource } from "../../store/actions/connectionInfo";

const ValidateTrip = () => {
  const dispatch = useDispatch();
  const [showBesideNode, setShowBesideNode] = useState(false);
  const { allNodes, userAngle } = useSelector((state) => ({
    allNodes: state.appMetaInfoReducer.allNodes,
    userAngle: state.userMomentReducer.angle,
  }));

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

    response.json().then((data) => {
      const allNodesData = [];
      Object.keys(data).map((d) => {
        allNodesData.push(data[d]);
      });
      dispatch(getAllNodesAction(allNodesData));
    });
  };

  const updateShopAngle = (node) => {
    setShowBesideNode(true);
    dispatch(updateCurrentSource(node));
  };
  useEffect(() => {
    getAllNodes();
  }, []);

  return (
    <div className="validate-angle-container">
      <div className="user-angle-container">
        {userAngle}
        <span className="field-info">Angle</span>
      </div>
      {showBesideNode ? (
        <BesideNodes from="validateTrip" />
      ) : (
        <SearchBar dataList={allNodes} updateShopAngle={updateShopAngle} />
      )}
      <button
        className="button button--secondary"
        onClick={() => {
          setShowBesideNode(false);
        }}
      >
        back
      </button>
    </div>
  );
};

export default ValidateTrip;
