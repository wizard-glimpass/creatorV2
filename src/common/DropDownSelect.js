import React, { useState } from "react";
import "./dropDownSelect.scss";

const DropDownSelect = ({ options, onChange, defaultValue }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <select value={selected} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropDownSelect;
