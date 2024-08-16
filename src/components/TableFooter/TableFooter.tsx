import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";
import { ReactElement } from "react";
import TableEntries from "../TableEntries/TableEntries";

interface TableFooterProps {
  range: number[];
  setPage: (page: number) => void;
  page: number;
  filteredRows: unknown[];
  startIndex: number;
  endIndex: number;
  totalEntries: number;
}
const TableFooter: React.FC<TableFooterProps> = ({ range, setPage, page, filteredRows, totalEntries, startIndex, endIndex }) => {
  
  useEffect(() => {
    if (filteredRows.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [filteredRows, page, setPage]);

  //useMemo
  const renderPageNumbers = () => {
    const pages: ReactElement[] = [];

    if (range.length <= 6) {
      return range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ));
    }

    pages.push(
      <button
        key={1}
        className={`${styles.button} ${
          page === 1 ? styles.activeButton : styles.inactiveButton
        }`}
        onClick={() => setPage(1)}
      >
        1
      </button>
    );

    if (page > 3) {
      pages.push(<span>...</span>);
    }

    for (let i = Math.max(2, page - 1); i <= Math.min(range.length - 1, page + 1); i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.button} ${
            page === i ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    if (page < range.length - 2) {
      pages.push(<span>...</span>);
    }

    pages.push(
      <button
        key={range.length}
        className={`${styles.button} ${
          page === range.length ? styles.activeButton : styles.inactiveButton
        }`}
        onClick={() => setPage(range.length)}
      >
        {range.length}
      </button>
    );

    return pages;
  };

  return (
    <div className={styles.tableContainer}>
      <TableEntries startIndex={startIndex} endIndex={endIndex} totalEntries={totalEntries} />
      <div className={styles.tableFooter}>
        <button
          className={`${styles.button}`}
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          className={`${styles.button}`}
          onClick={() => page < range.length && setPage(page + 1)}
          disabled={page === range.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TableFooter;