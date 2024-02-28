import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./validateTrip.scss";
import SearchBar from "../../common/SearchBar";
import BesideNodes from "../BesideNodes";
import { updateCurrentSource } from "../../store/actions/connectionInfo";

const ValidateTrip = () => {
  const dispatch = useDispatch();
  const [showBesideNode, setShowBesideNode] = useState(false);
  const { allNodes, userAngle } = useSelector(state => ({
    allNodes: state.appMetaInfoReducer.allNodes,
    userAngle: state.userMomentReducer.angle,
  }));

  const updateShopAngle = node => {
    setShowBesideNode(true);
    dispatch(updateCurrentSource(node));
  };

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
