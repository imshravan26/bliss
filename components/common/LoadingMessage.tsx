// components/common/LoadingMessage.tsx
export default function LoadingMessage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header skeleton */}
      <div className="border-b p-4 flex items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-20 mt-1 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Message area skeleton */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Their message */}
          <div className="flex items-end gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 rounded-2xl rounded-bl-none px-4 py-2 w-1/3 h-16 animate-pulse"></div>
          </div>

          {/* My message */}
          <div className="flex items-end justify-end gap-2">
            <div className="bg-gray-200 rounded-2xl rounded-br-none px-4 py-2 w-1/2 h-12 animate-pulse"></div>
          </div>

          {/* Their message */}
          <div className="flex items-end gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 rounded-2xl rounded-bl-none px-4 py-2 w-2/5 h-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Message input skeleton */}
      <div className="border-t p-4 flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
