"use client";
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialState: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialState,
}) => {
  const [items, setItems] = useState(initialState);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  return (
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
            // onClick={() => setIsModalOpen(true)}
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
  );
};

export default ConversationList;
