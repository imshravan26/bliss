import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Join Bliss</h1>
          <p className="mt-2 text-gray-600">Connect with creative minds</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
