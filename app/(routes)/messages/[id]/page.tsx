// app/(routes)/messages/[id]/page.tsx

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MessageThread from "@/components/common/MessageThread";
import { getConversationMessages } from "@/lib/actions/message.actions";
import LoadingMessage from "@/components/common/LoadingMessage";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 md:ml-64">
          <Suspense fallback={<LoadingMessage />}>
            <MessageThreadContainer conversationId={params.id} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

async function MessageThreadContainer({
  conversationId,
}: {
  conversationId: string;
}) {
  try {
    const { messages, otherParticipant } = await getConversationMessages(
      conversationId
    );

    return (
      <MessageThread
        messages={messages}
        recipient={otherParticipant}
        conversationId={conversationId}
      />
    );
  } catch (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">
          Conversation not found or you don't have access.
        </p>
      </div>
    );
  }
}
