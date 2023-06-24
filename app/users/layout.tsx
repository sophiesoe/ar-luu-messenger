import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "../components/users/UserList";
import getUsers from "../actions/getUsers";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
