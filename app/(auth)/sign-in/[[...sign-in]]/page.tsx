import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Bliss</h1>
          <p className="mt-2 text-gray-600">The creative community platform</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
