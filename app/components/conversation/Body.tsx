"use client";
import { useState, useRef, useEffect } from "react";
import { FullMessageType } from "@/app/types";
import MessageBox from "./MessageBox";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`, {});
  }, [conversationId]);

  return (
    <div className="no-scrollbar flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={messages.length - 1 === i}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
