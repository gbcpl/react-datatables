type TableRowData = {
  [key: string]: string | number | boolean | null | undefined;
};

interface TableProps {
  tableData: TableRowData[];
  columns: string[];
}

export const TableBody = ({ tableData, columns }: TableProps) => {
  return (
    <tbody>
      {tableData.map((data, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((col, colIndex) => {
            const tData = data[col] ? data[col] : "——";
            return <td key={colIndex}>{tData}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
