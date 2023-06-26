import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Body from "@/app/components/conversation/Body";
import Header from "@/app/components/conversation/Header";
import Form from "@/app/components/conversation/Form";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className="block h-screen lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full lg:pl-80">
      <div className="flex h-screen flex-col bg-primary-100 ">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
