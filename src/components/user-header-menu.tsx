"use client";
import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "@/app/(auth)/actions";
import { UserDTO } from "@/lib/dto";

export function UserHeaderMenu(props: { user: UserDTO }) {
  const { user } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-8 w-8 rounded-lg text-lg flex items-center justify-center mr-4">
          <UserCircle />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-3 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={logout} className="text-sm">
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
