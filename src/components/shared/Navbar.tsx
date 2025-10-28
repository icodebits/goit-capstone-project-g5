"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();

  const isLoggedIn = false; // TODO: Replace with actual auth state

  if (!isLoggedIn) {
    return (
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                GoIT Capstone
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              GoIT Capstone
            </Link>
            <div className="hidden space-x-4 md:flex">
              <Link
                href="/dashboard"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === "/dashboard"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === "/profile"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
