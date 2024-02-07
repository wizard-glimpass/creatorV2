import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";

function SearchBar({ dataList, updateShopAngle }) {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataList);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // You can set a default or make this configurable
  const [exactSearch, setExactSearch] = useState(false); // State for the exact search toggle
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
    console.log("hello");
    const lowerCaseQuery = newQuery.toLowerCase(); // Convert query to lower case
    const filteredList = dataList.filter(
      (item) =>
        exactSearch
          ? item?.name?.toLowerCase() === lowerCaseQuery // Compare in the same case
          : item?.name?.toLowerCase().includes(lowerCaseQuery) // Compare in the same case
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
    exactSearch, // Add exactSearch as a dependency
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

  // Pagination functions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="searchbar-container">
      <div>
        <input
          type="checkbox"
          checked={exactSearch}
          onChange={() => setExactSearch(!exactSearch)}
        />
        Exact Match
      </div>
      <input
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={handleInputChange}
      />
      <div className="nodes-list">
        {currentItems.map((node, index) => (
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        paginate={paginate}
      />
    </div>
  );
}

export default SearchBar;

// Pagination component
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
