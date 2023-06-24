import getConversations from "../actions/getConversations";
import ConversationList from "../components/conversation/ConversationList";
import Sidebar from "../components/sidebar/Sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-screen">
        <ConversationList initialState={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
