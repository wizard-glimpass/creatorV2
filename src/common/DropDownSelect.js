import React, { useState } from "react";
import "./dropDownSelect.scss";

const DropDownSelect = ({ options, onChange, defaultValue }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (e) => {
    const newValue = e.target.value;
    e.target.floorDirection = 0;
    e.target.nodeTypee = e.target.value;
    if (newValue === "floor change unidirection") {
      e.target.floorDirection = 1;
      e.target.nodeTypee = "floor_change";
    } else if (newValue === "floor change bidirection") {
      e.target.nodeTypee = "floor_change";
    }
    setSelected(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <select value={selected} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} name={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropDownSelect;
