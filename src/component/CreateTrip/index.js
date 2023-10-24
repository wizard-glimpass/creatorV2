import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../common/SearchBox";
import { getAllNodesAction } from "../../store/actions/appMetaInfo";
import "./createTrip.scss";

export const CreateTrip = () => {
  const dispatch = useDispatch();
  const [stepsEditing, setStepsEditing] = useState(false);
  const { userAngle, userSteps, allNodesData } = useSelector((state) => ({
    userAngle: state.userMomentReducer.angle,
    userSteps: state.userMomentReducer.steps,
    allNodesData: state.appMetaInfoReducer.allNodes,
  }));

  const [averageAngleData, setAverageAngleData] = useState({
    angleSum: { sinAlphaSum: 0, cosAlphaSum: 0 },
    interval: 0,
    averageAngle: 0,
  });

  const getAllNodes = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `https://app.glimpass.com/graph/get-all-nodes?market=${window.marketSelection}`,
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

  useEffect(() => {
    getAllNodes();
  }, []);

  const calculateAverageAngle = () => {
    const { angleSum: alphaSum, interval: alphaReadingsCounted } =
      averageAngleData;
    const avgX = alphaSum.cosAlphaSum / alphaReadingsCounted;
    const avgY = alphaSum.sinAlphaSum / alphaReadingsCounted;
    const avgAngle = (Math.atan2(avgY, avgX) * (180 / Math.PI) + 360) % 360;
    setAverageAngleData((prev) => ({
      ...prev,
      averageAngle: parseInt(avgAngle),
    }));
  };

  useEffect(() => {
    setAverageAngleData((prevAngle) => {
      console.log(prevAngle, "manish");
      let sumX = prevAngle.angleSum.cosAlphaSum;
      let sumY = prevAngle.angleSum.sinAlphaSum;
      let interval = prevAngle.interval + 1;

      sumX += Math.cos(userAngle * (Math.PI / 180));
      sumY += Math.sin(userAngle * (Math.PI / 180));

      return { angleSum: { sinAlphaSum: sumY, cosAlphaSum: sumX }, interval };
    });
    calculateAverageAngle();
  }, [userSteps]);

  return (
    <div className="create-trip-container">
      <div className="user-angle-container">
        <span className="field-info">Current angle</span>
        {userAngle}
      </div>
      <div className="angle-floor-container">
        <div className="user-angle-container">
          {averageAngleData.averageAngle}
          <span className="field-info">Average angle</span>
        </div>
        {stepsEditing ? (
          <div className="user-angle-container">
            <span className="field-info">Total steps</span>
            <button
              onClick={() => {
                setStepsEditing(false);
                //   dispatch(changeFloor(floorValue));
              }}
              className="action-icon"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <input
              type="text"
              value={userSteps}
              onChange={(event) => {
                //   setFloorValue(event.target.value);
              }}
            />
          </div>
        ) : (
          <div className="user-angle-container">
            <span className="field-info">Total steps</span>
            {userSteps}
            <button
              onClick={() => {
                setStepsEditing(true);
              }}
              className="action-icon"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        )}
      </div>

      <SearchBox type="Source" data={allNodesData} />
      <SearchBox type="Destination" data={allNodesData} />

      <button className="button button--primary">Connect</button>

      <button className="button button--secondary">Add checkpoint</button>

      <button className="button button--primary">Preview trip</button>
    </div>
  );
};

export default CreateTrip;
