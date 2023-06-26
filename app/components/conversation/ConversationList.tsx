"use client";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect, use } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "../modals/GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialState: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialState,
  users,
}) => {
  const [items, setItems] = useState(initialState);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { isOpen, conversationId } = useConversation();
  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, router, conversationId]);

  return (
    <>
      <GroupChatModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        users={users}
      />
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0
        overflow-y-auto 
        border-r
        border-primary-100 
        pb-20
        lg:left-20 
        lg:block
        lg:w-80 
        z-10
        lg:pb-0 
      `,
          isOpen ? "hidden" : "left-0 block w-full"
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex items-center justify-between pt-4">
            <div
              className="
              text-xl 
              font-semibold
            "
            >
              Your Messages
            </div>
            <div
              title="create group chat"
              onClick={() => setOpenModal(true)}
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
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              selected={conversationId === item.id}
              data={item}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
