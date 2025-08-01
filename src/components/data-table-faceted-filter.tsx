import { type Icon } from "@tabler/icons-react";
import { Column } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Command, CommandEmpty, CommandItem, CommandList } from "./ui/command";

interface DataTableFacetedFilterProps {
  column?: Column<any, any>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: Icon;
  }[];
}

export function DataTableFacetedFilter(props: DataTableFacetedFilterProps) {
  const { title, column, options } = props;
  const selectevValues = React.useMemo(
    () => new Set(column?.getFilterValue() as string[]),
    [column]
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <PlusCircleIcon />
          {title}
          {selectevValues.size > 0 && (
            <>
              <Separator orientation="vertical" />
              <Badge variant="secondary">{selectevValues.size}</Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectevValues.size > 2 ? (
                  <>
                    <Badge variant="secondary">
                      {selectevValues.size} selected
                    </Badge>
                  </>
                ) : (
                  <>
                    {options
                      .filter((o) => selectevValues.has(o.value))
                      .map((o) => (
                        <Badge key={o.value}>{o.label}</Badge>
                      ))}
                  </>
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            {options.map((o) => (
              <CommandItem
                key={o.value}
                value={o.value}
                onSelect={() => {
                  const isSelected = selectevValues.has(o.value);
                  if (isSelected) {
                    selectevValues.delete(o.value);
                  } else {
                    selectevValues.add(o.value);
                  }
                  const filterValues = Array.from(selectevValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }}
              >
                {o.icon && <o.icon />}
                <span>{o.label}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
