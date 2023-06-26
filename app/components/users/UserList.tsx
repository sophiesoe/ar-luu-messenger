"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import { IoSettingsOutline } from "react-icons/io5";
import SettingsModal from "../modals/SettingModal";
import { useState } from "react";

interface UserListProps {
  items: User[];
  currentUser: User;
}

const UserList: React.FC<UserListProps> = ({ items, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
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
          <div className="mb-4 flex items-center justify-between pt-4">
            <div
              className="
              text-xl 
              font-semibold
            "
            >
              Your Friends
            </div>
            <div
              title="user settings"
              onClick={() => setIsOpen(true)}
              className="
                cursor-pointer 
                rounded-full 
                bg-primary-200 
                p-2
                text-primary-50
                transition
                duration-300
                hover:opacity-75
              "
            >
              <IoSettingsOutline size={20} />
            </div>
          </div>
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default UserList;
