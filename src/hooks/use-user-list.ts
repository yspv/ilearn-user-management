import { UserDTO } from "@/lib/dto";
import React from "react";

const useUsersList = () => {
  const [users, setUsers] = React.useState<UserDTO[]>([]);

  function block(ids: number[]) {
    users.forEach((u) => {
      if (ids.includes(u.id)) u.isActive = false;
    });
    setUsers(users);
  }

  function unblock(ids: number[]) {
    users.forEach((u) => {
      if (ids.includes(u.id)) u.isActive = true;
    });
    setUsers(users);
  }

  function deleteUsers(ids: number[]) {
    setUsers(users.filter((u) => !ids.includes(u.id)));
  }

  return { users, setUsers, block, unblock, deleteUsers };
};

export default useUsersList;
