import React from 'react';

interface TableEntriesProps {
  startIndex: number;
  endIndex: number;
  totalEntries: number;
}

const TableEntries: React.FC<TableEntriesProps> = ({ startIndex, endIndex, totalEntries }) => {
  if (totalEntries === 0) {
    return <p>No entries available</p>;
  }

  return (
    <p>Showing {startIndex} to {endIndex} of {totalEntries} entries</p>
  );
};

export default TableEntries;