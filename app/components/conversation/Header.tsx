"use client";

import Avatar from "@/app/commons/avatar/Avatar";
import useOtherUser from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import ConfirmModal from "../modals/ConfirmModal";
import AvatarGroup from "@/app/commons/avatar/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.id!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active now" : "Offline";
  }, [conversation, isActive]);

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        onConfirmOpen={() => setConfirmOpen(true)}
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
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <p className="font-semibold">
              {conversation.name || otherUser.name}
            </p>
            <div className="text-sm font-light text-gray">{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={28}
          onClick={() => setDrawerOpened(!drawerOpened)}
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
