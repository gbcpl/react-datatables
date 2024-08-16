export type TableRowData = {
  [key: string]: string | number | boolean | null | undefined;
};

export type Datatype = TableRowData[];

export type ColumnType = {
  column: string;
  index: string;
  sortable: boolean;
  sortbyOrder?: "asc" | "desc";
}