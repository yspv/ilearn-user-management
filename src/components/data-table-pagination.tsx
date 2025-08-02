import { Table } from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DataTablePaginationProps {
  table: Table<any>;
}

export function DataTableSelectedRows(props: DataTablePaginationProps) {
  const { table } = props;
  return (
    <div className="text-muted-foreground flex-1 text-sm flex">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
  );
}

export function DataTablePageSizeSelection(props: DataTablePaginationProps) {
  const { table } = props;
  return (
    <Select
      value={`${table.getState().pagination.pageSize}`}
      onValueChange={(value) => {
        table.setPageSize(Number(value));
      }}
    >
      <SelectTrigger size="sm" className="w-20" id="rows-per-page">
        <SelectValue placeholder={table.getState().pagination.pageSize} />
      </SelectTrigger>
      <SelectContent side="top">
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <SelectItem key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function DataTablePageIndex(props: DataTablePaginationProps) {
  const { table } = props;
  return (
    <div className="flex w-fit items-center justify-center text-sm font-medium">
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </div>
  );
}

export function DataTablePagination(props: DataTablePaginationProps) {
  const { table } = props;
  return (
    <div className="ml-auto flex items-center gap-2 lg:ml-0">
      <Button
        variant="outline"
        className="hidden h-8 w-8 p-0 lg:flex"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <IconChevronsLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <IconChevronLeft />
      </Button>
      <Button
        variant="outline"
        className="size-8"
        size="icon"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <IconChevronRight />
      </Button>
      <Button
        variant="outline"
        className="hidden size-8 lg:flex"
        size="icon"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <IconChevronsRight />
      </Button>
    </div>
  );
}
