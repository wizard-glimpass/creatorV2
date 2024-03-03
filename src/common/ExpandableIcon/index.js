import React, { useState } from "react";
import "./ExpandableIcon.scss"; // Note the change to SCSS extension

const ExpandableIcon = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="container">
      <div className="icon" onClick={toggleOpen}>
        {isOpen ? "✖" : "☰"} {/* This is a simple representation for demo */}
      </div>
      {isOpen && <div className="options">{children}</div>}
    </div>
  );
};

export default ExpandableIcon;
