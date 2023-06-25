"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px] z-20",
    1: "bottom-0 z-10",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            h-[25px] 
            w-[25px]
            overflow-hidden
            rounded-full
            shadow-sm
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image
            fill
            src={user?.image || "/images/placeholder.jpg"}
            alt="Avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
