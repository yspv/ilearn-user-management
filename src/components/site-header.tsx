"use client";
import { UserDTO } from "@/lib/dto";
import { UserHeaderMenu } from "./user-header-menu";

export function SiteHeader(props: { user: UserDTO }) {
  const { user } = props;
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">Users</h1>
      </div>
      <UserHeaderMenu user={user} />
    </header>
  );
}
