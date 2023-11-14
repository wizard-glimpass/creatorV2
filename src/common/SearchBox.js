import React, { useState, useRef } from "react";
import "./searchBox.scss";

function SearchBox({ data, type, onSelect }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setSHowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const ref = useRef(null);

  // Sample data for suggestions

  const filteredData = data.filter((item) =>
    item?.name?.toLowerCase()?.includes(query?.toLowerCase())
  );

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
    setSHowDropdown(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setActiveIndex(-1);
    setSHowDropdown(false);
    onSelect(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && activeIndex < filteredData.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === "ArrowUp" && activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    } else if (e.key === "Enter" && activeIndex !== -1) {
      setQuery(filteredData[activeIndex]);
    }
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setQuery(""); // close suggestions
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="searchbox-container" ref={ref}>
      <span className="field-info">Select {type} Node</span>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && (
        <ul>
          {filteredData.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={index === activeIndex ? "active" : ""}
            >
              {suggestion.name}
              <span className="align-right">{suggestion.floor}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
