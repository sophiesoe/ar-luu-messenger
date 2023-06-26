import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "../components/users/UserList";
import getUsers from "../actions/getUsers";
import getCurrentUser from "../actions/getCurrentUser";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  const currentUser = await getCurrentUser();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} currentUser={currentUser!} />
        {children}
      </div>
    </Sidebar>
  );
}
