"use client";

import Avatar from "@/app/commons/avatar/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex items-end gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-1", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-primary-300 text-white" : "bg-primary-50 text-black",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{data.sender.name}</p>
        </div>
        <div className={`flex items-end gap-2 ${!isOwn && "flex-row-reverse"}`}>
          <p className="text-xs text-gray">
            {format(new Date(data.createdAt), "p")}
          </p>
          <div className={message}>
            {data.image ? (
              <Image
                alt={data.image}
                width={288}
                height={288}
                src={data.image}
                className="
                translate 
                cursor-pointer 
                object-cover 
                transition 
                hover:scale-110
              "
              />
            ) : (
              <p>{data.body}</p>
            )}
          </div>
        </div>
        <div>
          {isOwn && isLast && seenList.length > 0 && (
            <p className="text-xs text-gray">{`Seen by ${seenList}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
