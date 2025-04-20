import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ConversationList from "@/components/common/ConversationList";
import { getUserConversations } from "@/lib/actions/message.actions";

export default async function MessagesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 md:ml-64 flex">
          <Suspense fallback={<div>Loading conversations...</div>}>
            <ConversationListContainer />
          </Suspense>

          {/* Empty state for message content on larger screens */}
          <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-gray-50">
            <div className="max-w-md p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Your Messages</h3>
              <p className="text-gray-600 mb-4">
                Connect with other creative minds in the Bliss community. Select
                a conversation to start chatting.
              </p>
              <p className="text-sm text-gray-500">
                Messages are private and only visible to you and the recipient.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

async function ConversationListContainer() {
  const { conversations } = await getUserConversations();
  return <ConversationList conversations={conversations} />;
}
