"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ConversationProps {
  _id: string;
  participants: [
    {
      _id: string;
      name: string;
      username: string;
      profileImage: string;
      online: boolean;
    }
  ];
  lastMessage: {
    content: string;
    createdAt: string;
    read: boolean;
  };
  unreadCount: number;
  updatedAt: string;
}

interface ConversationListProps {
  conversations: ConversationProps[];
}

export default function ConversationList({
  conversations,
}: ConversationListProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.participants[0]?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      conversation.participants[0]?.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-72 lg:w-80 border-r">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => {
              const otherUser = conversation.participants[0];
              const isActive = pathname === `/messages/${conversation._id}`;

              return (
                <Link
                  key={conversation._id}
                  href={`/messages/${conversation._id}`}
                >
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                      isActive ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-gray-300">
                        {otherUser?.profileImage && (
                          <img
                            src={otherUser.profileImage}
                            alt={otherUser.name}
                            className="h-full w-full object-cover rounded-full"
                          />
                        )}
                      </div>
                      {otherUser?.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">
                          {otherUser?.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(
                            new Date(conversation.updatedAt),
                            { addSuffix: false }
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage?.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <div className="h-5 w-5 flex items-center justify-center bg-purple-600 text-white rounded-full text-xs">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No conversations found</p>
              {searchTerm && (
                <p className="text-sm text-gray-400 mt-2">
                  Try using different search terms
                </p>
              )}
            </div>
          )}

          {conversations.length === 0 && !searchTerm && (
            <div className="text-center py-8">
              <p className="text-gray-500">No messages yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Start a conversation with someone in the community
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
