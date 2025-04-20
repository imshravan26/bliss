import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="font-bold text-xl text-purple-700">
              Bliss
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              A community for creative people
            </p>
          </div>

          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-purple-700"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-purple-700"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-purple-700"
            >
              Privacy
            </Link>
            <Link
              href="/help"
              className="text-sm text-gray-600 hover:text-purple-700"
            >
              Help
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Bliss. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
