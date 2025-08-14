import type { FilterType } from "../types/todo";

const Filter = ({ handleFilter, filter }: { filter: FilterType, handleFilter: (filter: FilterType) => void }) => {
  const handleFilterChange = (filter: FilterType) => {
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
      <label className='pr-2 text-plum-400 dark:text-ivory-200'
        htmlFor="all">All</label>
      <input
        type="radio"
        id="active"
        name="filter"
        value="Active"
        checked={filter === "Active"}
        onChange={() => handleFilterChange("Active")}
      />
      <label className='pr-2 text-plum-400 dark:text-ivory-200'
        htmlFor="active">Active</label>
      <input
        type="radio"
        id="completed"
        name="filter"
        value="Completed"
        checked={filter === "Completed"}
        onChange={() => handleFilterChange("Completed")}
      />
      <label className='pr-2 text-plum-400 dark:text-ivory-200'
        htmlFor="completed">Completed</label>
    </div>
  );
}
export default Filter;