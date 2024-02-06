import React from "react";

const SearchBar = ({ query, handleSearch }) => {
  //   console.log("query", query);
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search books..."
        className="p-2 border rounded"
      />
    </>
  );
};

export default SearchBar;
