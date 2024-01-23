import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function SearchBar({ dataList, updateShopAngle }) {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataList);
  const navigate = useNavigate();

  // Debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const filterData = (newQuery) => {
    const filteredList = dataList.filter((item) =>
      item?.name?.toLowerCase().includes(newQuery.toLowerCase())
    );
    const sortedList = filteredList.sort((a, b) => {
      let nameA = a?.name?.toUpperCase();
      let nameB = b?.name?.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setFilteredData(sortedList);
  };

  // Debounced version of the filter data function
  const debouncedFilterData = useCallback(debounce(filterData, 500), [
    dataList,
  ]);

  // Function to handle input change
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedFilterData(newQuery);
  };

  useEffect(() => {
    setFilteredData(dataList);
  }, [dataList]);

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={handleInputChange}
      />
      <div className="nodes-list">
        {filteredData.slice(0, 10).map((node, index) => (
          <div className="preview-node" key={node.nodeId}>
            <span>{node.floor}</span>
            <p
              onClick={() => {
                navigate(`/edit-node/${node.nodeId}`);
              }}
              className="node-name"
            >
              {node.name}
            </p>
            <span>{node.shop_angle}</span>
            <span
              onClick={() => {
                updateShopAngle(node);
              }}
              className="close-btn"
            >
              <FontAwesomeIcon icon={faUpload} size="1x" className="icon" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
