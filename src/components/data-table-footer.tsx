import { Table } from "@tanstack/react-table";
import {
  DataTablePageIndex,
  DataTablePageSizeSelection,
  DataTablePagination,
  DataTableSelectedRows,
} from "./data-table-pagination";

export function DataTableFooter(props: { table: Table<any> }) {
  const { table } = props;
  return (
    <div className="flex justify-between items-center">
      <DataTableSelectedRows table={table} />
      <div className="flex items-center justify-center gap-6">
        <DataTablePageSizeSelection table={table} />
        <DataTablePageIndex table={table} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
