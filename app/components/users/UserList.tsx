"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside
      className="
        fixed 
        inset-y-0
        left-0
        w-full 
        overflow-y-auto
        border-r
        border-primary-100 
        pb-20
        lg:left-20 
        lg:block 
        lg:w-80
        lg:pb-0
      "
    >
      <div className="px-5">
        <div className="flex-col items-center">
          <div
            className="
              py-4 
              text-xl 
              font-semibold
            "
          >
            Your Friends
          </div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
