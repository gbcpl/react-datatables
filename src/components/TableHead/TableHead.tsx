import { useState } from "react";
import styles from './TableHead.module.css'

interface Column {
  column: string;
  index: string;
  sortable: boolean;
  sortbyOrder?: "asc" | "desc";
}

interface TableHeadProps {
  columns: Column[];
  onSortingChange: (field: string, order: "asc" | "desc") => void;
  sortField: string;
  order: "asc" | "desc";
}

export function TableHead({ columns, onSortingChange, sortField, order }: TableHeadProps) {
  const [internalSortField, setInternalSortField] = useState(sortField);
  const [internalOrder, setInternalOrder] = useState(order);

  function formatTitles(title: string): string {
    if (!title) {
      return '';
    }
    const result = title.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === internalSortField && internalOrder === "asc" ? "desc" : "asc";
    setInternalSortField(accessor);
    setInternalOrder(sortOrder);
    onSortingChange(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ column, index, sortable }) => {
          const cl = sortable
            ? internalSortField === index && internalOrder === "asc"
              ? styles.up
              : internalSortField === index && internalOrder === "desc"
              ? styles.down
              : styles.default
            : "";
          return (
            <th
              key={index}
              onClick={sortable ? () => handleSortingChange(index) : undefined}
              className={cl}
            >
              {formatTitles(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
