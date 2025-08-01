import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Row, Table } from "@tanstack/react-table";
import { LockIcon, LockOpenIcon, Trash2Icon } from "lucide-react";
import React from "react";

export interface DashboardToolbarActionsProps {
  onUnblock: (ids: number[]) => void;
  onBlock: (ids: number[]) => void;
  onDelete: (ids: number[]) => void;
}

export interface DashboardToolbarProps {
  table: Table<any>;
  onUnblock: (ids: number[]) => void;
  onBlock: (ids: number[]) => void;
  onDelete: (ids: number[]) => void;
}

function DashboardToolbarActions(
  props: DashboardToolbarActionsProps & {
    selectedRows: Row<any>[];
    reset: () => void;
  }
) {
  const { onBlock, onUnblock, onDelete, selectedRows, reset } = props;
  const ids = React.useMemo(
    () => selectedRows.map((r) => r.original.id),
    [selectedRows]
  );
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={() => {
          onUnblock(ids);
          reset();
        }}
        size="sm"
        variant="outline"
        className="text-xs bg-blue-100 text-blue-900"
      >
        <LockOpenIcon className="size-3" />
        Unblock
      </Button>
      <Button
        onClick={() => {
          onBlock(ids);
          reset();
        }}
        size="sm"
        variant="outline"
        className="text-xs bg-red-200 text-red-900"
      >
        <LockIcon className="size-3" />
        Block
      </Button>
      <Button
        onClick={() => {
          onDelete(ids);
          reset();
        }}
        size="sm"
        variant="destructive"
        className="text-xs"
      >
        <Trash2Icon className="size-3" />
        Delete
      </Button>
    </div>
  );
}

export default function DashboardToolbar(props: DashboardToolbarProps) {
  const { table, ...actions } = props;
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {table.getSelectedRowModel().rows.length > 0 && (
        <DashboardToolbarActions
          {...actions}
          reset={() => table.resetRowSelection()}
          selectedRows={table.getSelectedRowModel().rows}
        />
      )}
      <div className="flex items-center gap-4 justify-end w-full">
        <Input
          onInput={(e) =>
            table.getColumn("email")?.setFilterValue(e.currentTarget.value)
          }
          className="md:w-80 self-end"
          placeholder="Search by e-mail"
        />
      </div>
    </div>
  );
}
