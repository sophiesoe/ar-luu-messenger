import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import ConversationList from "../components/conversation/ConversationList";
import Sidebar from "../components/sidebar/Sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-screen">
        We are fixing this issue...
        {/* <ConversationList
          initialState={conversations}
          users={users}
          title="Messages"
        /> */}
        {children}
      </div>
    </Sidebar>
  );
}
