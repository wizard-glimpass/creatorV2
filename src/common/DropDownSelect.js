import React, { useState } from "react";
import "./dropDownSelect.scss";

const DropDownSelect = ({ options, onChange, defaultValue }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(e.target.value, "manish");
    e.target.floorDirection = 0;
    if (newValue === "floor change unidirection") {
      e.target.floorDirection = 1;
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