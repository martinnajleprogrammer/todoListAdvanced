import { useState } from "react";
const Filter = ({ handleFilter, filter }: { filter: string, handleFilter: (filter: string) => void }) => {
  const handleFilterChange = (filter: string) => {
    handleFilter(filter);
  };
  return (
    <div>
      <input
        type="radio"
        id="all"
        name="filter"
        value="All"
        checked={filter === "All"}
        onChange={() => handleFilterChange("All")}
      />
      <label htmlFor="all">All</label>
      <input
        type="radio"
        id="active"
        name="filter"
        value="Active"
        checked={filter === "Active"}
        onChange={() => handleFilterChange("Active")}
      />
      <label htmlFor="active">Active</label>
      <input
        type="radio"
        id="completed"
        name="filter"
        value="Completed"
        checked={filter === "Completed"}
        onChange={() => handleFilterChange("Completed")}
      />
      <label htmlFor="completed">Completed</label>
    </div>
  );
}
export default Filter;