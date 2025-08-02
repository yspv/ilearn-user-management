import Forbidden from "@/components/forbidden";
import { SiteHeader } from "@/components/site-header";
import { getUser } from "@/lib/dal";
import { UserDTO } from "@/lib/dto";
import React from "react";

export default async function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  const user = await getUser();
  if (!user?.isActive) {
    return <Forbidden />;
  }

  return (
    <div className="bg-muted md:p-4">
      <div className=" bg-white rounded-md">
        <SiteHeader user={user as UserDTO} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
