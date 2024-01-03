import React, { useEffect, useState } from "react";
import "./marketSelection.scss";
import Modal from "../../common/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNodeInfo } from "../../store/actions/updateNodeInfo";
import { showSnackbar } from "../../store/actions/snackBar";
import { getAllNodesAction } from "../../store/actions/appMetaInfo";

const MarketSelection = () => {
  const [marketName, setMarketName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [malls, setMalls] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllMarkets = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `https://app.glimpass.com/graph/get-all-market`,
      requestOptions
    );

    const allMarkets = await response.json();
    setMalls(allMarkets);
  };

  const addMarket = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: marketName,
        city: "delhi",
      }),
    };
    await fetch(`https://app.glimpass.com/graph/add-market`, requestOptions);
    dispatch(showSnackbar("Market added successfully!", "success"));
    setModalOpen(false);
    getAllMarkets();
  };
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
      navigate("/");
    });
  };

  useEffect(() => {
    getAllMarkets();
  }, []);
  return (
    <div className="market-selection-container">
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="button button--primary"
      >
        Add market
      </button>

      {malls.map((mall) => (
        <div
          onClick={() => {
            window.sessionStorage.setItem("marketVal", mall.name);
            dispatch(
              updateNodeInfo({
                market: window.sessionStorage.getItem("marketVal"),
              })
            );
            getAllNodes();
          }}
          key={mall?.name}
          className="market-container"
        >
          <img src={mall.imageUrl} />
          <p>{mall?.name}</p>
        </div>
      ))}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <input
          className="market-input"
          onChange={(e) => {
            setMarketName(e.target.value);
          }}
          type="text"
          value={marketName}
          placeholder="Enter market name"
        />
        <button onClick={addMarket}>Add</button>
      </Modal>
    </div>
  );
};

export default MarketSelection;
