import React, { useState } from "react";
import "./marketSelection.scss";
import Modal from "../../common/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateNodeInfo } from "../../store/actions/updateNodeInfo";

const MarketSelection = () => {
  const [marketName, setMarketName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [malls, setMalls] = useState([
    {
      id: 1,
      name: "Ambience Mall, Gurugram",
      imageUrl:
        "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2016/05/Exterior_of_Ambi_Mall.jpg?w=1200&h=628&fill=blur&fit=fill",
    },
    {
      id: 2,
      name: "Airia Mall, Gurugram",
      imageUrl:
        "https://drive.google.com/file/d/1TCk_p3lX5K9iGhvQjtsJyxzEfhLCGKi4/view",
    },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

            navigate("/");
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
        <button
          onClick={() => {
            setMalls((mall) => [
              ...mall,
              {
                id: 3,
                name: marketName,
                imageUrl: "",
              }, // ... other malls}
            ]);
            setModalOpen(false);
          }}
        >
          Add
        </button>
      </Modal>
    </div>
  );
};

export default MarketSelection;
