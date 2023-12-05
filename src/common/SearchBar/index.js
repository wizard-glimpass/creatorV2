import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ dataList, updateShopAngle }) {
  // Sample data list
  //   const dataList = ["Apple", "Banana", "Orange", "Mango", "Grapes"];

  // State for the search query and filtered list
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataList);
  useEffect(() => {
    handleInputChange({ target: { value: query } });
    // setFilteredData(dataList);
  }, [dataList]);

  useEffect(() => {
    const k = [...filteredData];
    k.sort((a, b) => {
      let nameA = a.name.toUpperCase(); // convert name to uppercase to make the comparison case-insensitive
      let nameB = b.name.toUpperCase(); // same for nameB
      if (nameA < nameB) {
        return -1; // nameA comes first
      }
      if (nameA > nameB) {
        return 1; // nameB comes first
      }
      return 0; // names are equal
    });
    setFilteredData(k);
    // setFilteredData(dataList);
  }, [filteredData]);

  // Function to handle input change
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Filter the list based on the query
    const filteredList = dataList.filter((item) =>
      item.name.toLowerCase().includes(newQuery.toLowerCase())
    );
    setFilteredData(filteredList);
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={handleInputChange}
      />
      <div className="nodes-list">
        {filteredData.map((nodes, index) => {
          return (
            <div className="preview-node" key={nodes.nodeId}>
              <span>{nodes.floor}</span>
              <p className="node-name">{nodes.name}</p>
              <span>{nodes.shop_angle}</span>

              <span
                onClick={(e) => {
                  console.log(nodes);
                  updateShopAngle(nodes);
                }}
                className="close-btn"
              >
                <FontAwesomeIcon icon={faUpload} size="1x" className="icon" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
