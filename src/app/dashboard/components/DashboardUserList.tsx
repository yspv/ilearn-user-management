"use client";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "../columns";
import { DataTable } from "@/components/data-table";
import DashboardToolbar, {
  DashboardToolbarActionsProps,
} from "./DashboardToolbar";
import React from "react";
import { DataTableFooter } from "@/components/data-table-footer";

interface DashboardListProps extends DashboardToolbarActionsProps {
  users: any;
}

export function DashboardUserList(props: DashboardListProps) {
  const { users, ...actions } = props;
  const table = useReactTable({
    data: users,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <DashboardToolbar {...actions} table={table} />
      <div className="overflow-hidden rounded-lg border">
        <DataTable table={table} />
      </div>
      <DataTableFooter table={table} />
    </div>
  );
}
