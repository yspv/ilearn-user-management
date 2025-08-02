import { DataTableHeader } from "@/components/data-table-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Circle, ClockIcon, MailIcon, User2Icon } from "lucide-react";
import React from "react";

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
    header: ({ column }) =>
      DataTableHeader({ column, title: "Name", icon: <User2Icon /> }),
  },
  {
    accessorKey: "email",
    header: ({ column }) =>
      DataTableHeader({ column, title: "Email", icon: <MailIcon /> }),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) =>
      DataTableHeader({ column, title: "Status", icon: <Circle /> }),
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
    header: ({ column }) =>
      DataTableHeader({ column, title: "Last Login", icon: <ClockIcon /> }),
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
