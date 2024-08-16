import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSortableTable } from '../../hooks/useSortableTable';
import { TableHead } from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody'; 
import styles from "./DataTables.module.css";
import TableFooter from "../TableFooter/TableFooter";
import usePaginationTable from '../../hooks/usePaginationTable'; 
import { ColumnType, Datatype } from '../../types';
import TableSearch from '../TableSearch/TableSearch';

interface TableProps {
  data: Datatype
  rowsPerPage: number
  columns: ColumnType[]
}

const generateColumns = (data: Datatype): ColumnType[] => {
  if (data.length === 0) return [];
  return Object.keys(data[0]).map((key) => ({
    column: key.charAt(0).toUpperCase() + key.slice(1),
    index: key,
    sortable: true,
  }));
};

export function DataTables({ data, rowsPerPage, columns: initialColumns }: TableProps) {
  const [localColumns, setLocalColumns] = useState<ColumnType[]>(initialColumns || generateColumns(data));
  const [filteredData, setFilteredData] = useState(data);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(rowsPerPage);

  const [sortedData, handleSorting] = useSortableTable(filteredData, localColumns);

  const { filteredRows, range } = usePaginationTable(sortedData, page, itemsPerPage);

  useEffect(() => {
    setItemsPerPage(rowsPerPage);
  }, [rowsPerPage]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [filteredData]);

  const handleSortingChange = (field: string, order: "asc" | "desc") => {
    const updatedColumns = localColumns.map(col => {
      if (col.index === field) {
        return { ...col, sortbyOrder: order };
      }
      return { ...col, sortbyOrder: undefined };
    });
    setLocalColumns(updatedColumns);
    handleSorting(field, order);
  };

  const handleItemsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1); 
    }, [setItemsPerPage, setPage]
  );

  const getStartIndex = useMemo(() => (page - 1) * itemsPerPage + 1, [page, itemsPerPage]);
  const getEndIndex = useMemo(() => Math.min(page * itemsPerPage, filteredData.length), [page, itemsPerPage, filteredData]);

  return (
    <div>
      <TableSearch data={data} onFilter={setFilteredData}/>
      <table>
        <TableHead
          columns={localColumns}
          onSortingChange={handleSortingChange}
          sortField={localColumns.find(col => col.sortbyOrder)?.index || ""}
          order={localColumns.find(col => col.sortbyOrder)?.sortbyOrder || "asc"}
        />
        <TableBody tableData={filteredRows} columns={localColumns.map(col => col.index)} />
      </table>
      {filteredData.length === 0 && <p className={styles.noData}>No data available in table</p>}
      <div className={styles.paginationFooter}>
      <TableFooter 
          range={range} 
          filteredRows={filteredRows} 
          setPage={setPage} 
          page={page} 
          totalEntries={filteredData.length}
          startIndex={getStartIndex}
          endIndex={getEndIndex}
        />
        <select className={styles.itemsPage} id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
