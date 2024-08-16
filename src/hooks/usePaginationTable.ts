import { useState, useEffect } from "react";
import { Datatype } from "../types";

const calculateRange = (data: Datatype, rowsPerPage: number) => {
  const range: Array<number> = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

export const sliceData = (data: Datatype, page: number, rowsPerPage: number): Datatype => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const usePaginationTable = (data: Datatype, page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [filteredRows, setFilteredRows] = useState<Datatype>([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange(range);

    const slice = sliceData(data, page, rowsPerPage);
    setFilteredRows(slice);
  }, [data, page, rowsPerPage]);

  console.log(filteredRows);
  console.log(tableRange);
  
  return { filteredRows, range: tableRange };
};

export default usePaginationTable;
