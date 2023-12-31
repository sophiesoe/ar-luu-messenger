"use client";

import Avatar from "@/app/commons/avatar/Avatar";
import AvatarGroup from "@/app/commons/avatar/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUsers";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  selected?: boolean;
  data: FullConversationType;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  selected,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) {
      return false;
    }
    const seenArray = lastMessage.seen || [];
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageInfo = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  const userName = data.name || otherUser.name;
  const fullName = userName?.split(" ")!;
  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        relative
        flex 
        w-full 
        cursor-pointer 
        items-center 
        space-x-3 
        rounded-lg
        p-3
        transition
        hover:bg-primary-100
        `,
        selected ? "bg-primary-100" : "bg-primary-50"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          {/* <span className="absolute inset-0" aria-hidden="true" /> */}
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-semibold">
              {`${firstName} ${fullName.length > 1 ? lastName : ""}`}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs 
                  font-light 
                  text-gray
                "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate 
              text-sm
              `,
              hasSeen ? "font-normal text-gray" : "font-semibold"
            )}
          >
            {lastMessageInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
