"use client";
import { trpc } from "@/trpc/client";
import { DashboardUserList } from "./components/DashboardUserList";
import React from "react";
import useUsersList from "@/hooks/use-user-list";
import useToast from "@/hooks/use-toast";
import { DashboardError } from "./components/DashboardError";
import { Loader } from "@/components/loader";

export default function Page() {
  const { data, isLoading, isError } = trpc.user.findAll.useQuery();
  const userBlock = trpc.user.block.useMutation();
  const userDelete = trpc.user.delete.useMutation();
  const userUnblock = trpc.user.unblock.useMutation();
  const userList = useUsersList();
  const toast = useToast();

  const hasError =
    isError || userUnblock.isError || userDelete.isError || userBlock.isError;

  React.useEffect(() => userList.setUsers(data as any), [data, userList]);

  const handleOnBlock = (ids: number[]) => {
    userBlock
      .mutateAsync(ids)
      .then(() => {
        userList.block(ids);
        toast.onSuccess("User(s) blocked successfully.");
      })
      .catch(() => toast.onError());
  };

  const handleOnUnBlock = (ids: number[]) => {
    userUnblock
      .mutateAsync(ids)
      .then(() => {
        userList.unblock(ids);
        toast.onSuccess("User(s) unblocked successfully.");
      })
      .catch(() => toast.onError());
  };

  const handleOnDelete = (ids: number[]) => {
    userDelete
      .mutateAsync(ids)
      .then(() => {
        userList.deleteUsers(ids);
        toast.onSuccess("User(s) deleted successfully.");
      })
      .catch(() => toast.onError());
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <DashboardError />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardUserList
            users={userList.users || []}
            onBlock={handleOnBlock}
            onDelete={handleOnDelete}
            onUnblock={handleOnUnBlock}
          />
        </div>
      </div>
    </div>
  );
}
