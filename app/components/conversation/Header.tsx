"use client";

import Avatar from "@/app/commons/avatar/Avatar";
import useOtherUser from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import { set } from "date-fns";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active now";
  }, [conversation]);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpened={isOpened}
        onCloseDrawer={() => setIsOpened(false)}
      />
      <div
        className="
          flex
          w-full
          items-center
          justify-between
          bg-primary-50
          px-4
          py-3
          shadow-sm
          sm:px-4
        lg:px-6
        "
      >
        <div className="flex items-center gap-3">
          <Link
            href="/conversations"
            className="
              block
              cursor-pointer
              transition
              duration-100
              hover:text-gray
              lg:hidden
            "
          >
            <HiChevronLeft size={25} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <p className="font-semibold">
              {conversation.name || otherUser.name}
            </p>
            <div className="text-sm font-light text-gray">{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={28}
          onClick={() => setIsOpened(true)}
          className="
      
              cursor-pointer
              transition
              duration-100
              hover:text-gray
      
            "
        />
      </div>
    </>
  );
};

export default Header;
