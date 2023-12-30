import React, { useState } from "react";
import "./chip.scss"; // Ensure the path is correct for your SCSS file

const Chip = ({ label, onClick, selected }) => {
  return (
    <span className={`chip ${selected ? "selected" : ""}`} onClick={onClick}>
      {label}
    </span>
  );
};

const Chips = ({ data, onChipClick }) => {
  const [selectedChip, setSelectedChip] = useState(null);

  const handleChipClick = (item) => {
    setSelectedChip(item.label); // assuming label is unique
    onChipClick(item);
  };
  return (
    <div className="chips-container">
      {data.map((item, index) => (
        <Chip
          key={index}
          label={item.label}
          onClick={() => handleChipClick(item)}
          selected={item.label === selectedChip}
        />
      ))}
    </div>
  );
};

export default Chips;
