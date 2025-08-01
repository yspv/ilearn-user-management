import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Column, ColumnDef } from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  Circle,
} from "lucide-react";

function timeAgo(date: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const diff = (date.getTime() - now.getTime()) / 1000; // seconds

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 60 * 60 * 24 * 365 },
    { unit: "month", seconds: 60 * 60 * 24 * 30 },
    { unit: "week", seconds: 60 * 60 * 24 * 7 },
    { unit: "day", seconds: 60 * 60 * 24 },
    { unit: "hour", seconds: 60 * 60 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    const value = Math.round(diff / seconds);
    if (Math.abs(value) >= 1) {
      return rtf.format(value, unit);
    }
  }

  return "just now";
}

const DataTableHeader = (props: { column: Column<any>; title: string }) => {
  const { title, column } = props;
  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      className="justify-start"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span>{title} </span>
      {!column.getIsSorted() && <ChevronsUpDownIcon />}
      {column.getIsSorted() === "asc" && <ChevronUpIcon />}
      {column.getIsSorted() === "desc" && <ChevronDownIcon />}
    </Button>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => DataTableHeader({ column, title: "Name" }),
  },
  {
    accessorKey: "email",
    header: ({ column }) => DataTableHeader({ column, title: "Email" }),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => DataTableHeader({ column, title: "Status" }),
    cell: ({ row }) => (
      <Badge variant="outline">
        <Circle
          className={cn(
            row.original.isActive ? "fill-green-600" : "fill-red-600",
            "text-white"
          )}
        />
        {row.original.isActive ? "Active" : "Blocked"}
      </Badge>
    ),
  },
  {
    accessorKey: "lastLoginAt",
    header: ({ column }) => DataTableHeader({ column, title: "Last Login" }),
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          {timeAgo(new Date(row.original.lastLoginAt))}
        </TooltipTrigger>
        <TooltipContent>{row.original.lastLoginAt}</TooltipContent>
      </Tooltip>
    ),
  },
];
