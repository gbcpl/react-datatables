import { useState, useEffect } from "react";
import { ColumnType, Datatype } from "../types";

function getDefaultSorting(data: Datatype, columns: ColumnType[]) {
  const sorted = [...data].sort((a, b) => {
    const { index = "id", sortbyOrder = "asc" } = columns.find((column) => column.sortbyOrder) || { index: "id", sortbyOrder: "asc" };

    if (a[index] === null || a[index] === undefined) return 1;
    if (b[index] === null || b[index] === undefined) return -1;

    const ascending = a[index].toString().localeCompare(b[index].toString(), "en", {
      numeric: true,
    });

    return sortbyOrder === "asc" ? ascending : -ascending;
  });
  return sorted;
}

export const useSortableTable = (data: Datatype, columns: ColumnType[]) => {
  const [tableData, setTableData] = useState<Datatype>(getDefaultSorting(data, columns));

  useEffect(() => {
    setTableData(getDefaultSorting(data, columns));
  }, [data, columns]);

  const handleSorting = (sortField: string, sortOrder: "asc" | "desc") => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null || a[sortField] === undefined) return 1;
        if (b[sortField] === null || b[sortField] === undefined) return -1;

        const ascending = a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
          numeric: true,
        });

        return sortOrder === "asc" ? ascending : -ascending;
      });
      setTableData(sorted);
    }
  };

  return [tableData, handleSorting] as const;
};
