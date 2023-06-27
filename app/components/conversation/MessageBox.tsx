"use client";

import Avatar from "@/app/commons/avatar/Avatar";
import { useState } from "react";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ImageModal from "../modals/ImageModal";

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
}
const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const isLongText = data?.body?.length! > 50;
  const messageText = isLongText
    ? "rounded-lg px-3 py-2"
    : "rounded-full px-3 py-2";

  const container = clsx(
    "flex items-end gap-1 lg:gap-3 p-4",
    isOwn && "justify-end"
  );
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col mb-1", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-primary-300 text-white" : "bg-primary-50 text-black",
    data.image ? "rounded-md px-0" : messageText
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center">
          <p className="text-sm font-semibold">{data.sender.name}</p>
        </div>
        <div
          className={`flex items-end gap-1 lg:gap-2 ${
            !isOwn && "flex-row-reverse"
          }`}
        >
          <p className="text-[0.6rem]text-gray text-center lg:text-xs">
            {format(new Date(data.createdAt), "p")}
          </p>
          <div className={message}>
            <ImageModal
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
              src={data.image}
            />
            {data.image ? (
              <Image
                onClick={() => setImageModalOpen(true)}
                alt={data.image}
                width={266}
                height={266}
                src={data.image}
                className="
                translate 
                cursor-pointer 
                rounded-md 
                object-cover 
                p-0
                transition hover:scale-110
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
