import { Column } from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";

export const DataTableHeader = (props: {
  column: Column<any>;
  title: string;
  icon?: React.ReactNode;
}) => {
  const { title, column, icon } = props;
  return (
    <button
      className="flex items-center justify-start gap-2 h-8 shrink-0 [&_svg:not([class*='size-'])]:size-4 text-sm text-muted-foreground"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {icon}
      <span>{title} </span>
      {!column.getIsSorted() && <ChevronsUpDownIcon />}
      {column.getIsSorted() === "asc" && <ChevronUpIcon />}
      {column.getIsSorted() === "desc" && <ChevronDownIcon />}
    </button>
  );
};
