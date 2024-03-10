import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNodesAction } from "../../store/actions/appMetaInfo";
import "./validateAngle.scss";
import { showSnackbar } from "../../store/actions/snackBar";
import SearchBar from "../../common/SearchBar";

const ValidateAngle = () => {
  const dispatch = useDispatch();
  const { allNodes, userAngle } = useSelector(state => ({
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
      `https://application.glimpass.com/graph/get-all-nodes-by-market`,
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

  const updateShopAngleReq = async payload => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };
      await fetch(
        "https://application.glimpass.com/graph/create-nodes",
        requestOptions
      );
      dispatch(showSnackbar("Updation done successfully!", "success"));
      getAllNodes();
    } catch (err) {
      dispatch(showSnackbar("This is an error!", "alert"));
    }
  };

  const updateShopAngle = node => {
    const payload = [
      {
        ...node,
        nodeNames: [node.name],
        nodeAltName: [node.altNode],
        shopAngle: userAngle || 0,
      },
    ];

    updateShopAngleReq(payload);
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
      <SearchBar dataList={allNodes} updateShopAngle={updateShopAngle} />
    </div>
  );
};

export default ValidateAngle;
