import { useState, useEffect, ChangeEvent  } from "react";
import { Datatype } from "../../types";
import styles from './TableSearch.module.css'

type TableSearchProps = {data: Datatype, onFilter: (dataFiltered: Datatype) => void}

function TableSearch({ data, onFilter }: TableSearchProps) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const dataFiltered = data.filter(entry =>
      Object.values(entry).some(val => {
        if (typeof val === 'string') {
          return val.toLowerCase().includes(searchInput.toLowerCase());
        }
        return false;
      })
    );
    onFilter(dataFiltered);
  }, [searchInput, data, onFilter]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  return (
    <div className={styles.search}>
      <input
        type="search"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}

export default TableSearch;