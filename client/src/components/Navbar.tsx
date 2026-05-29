import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

export function Navbar() {
  return (
    <nav className="bg-linear-to-r from-purple-600 to-violet-600 px-6 py-4 text-white shadow-lg shadow-purple-850/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight transition hover:opacity-90"
        >
          FinTrack
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/"
            className="rounded-lg px-4 py-2 text-sm font-medium text-purple-100 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/auth"
            className="rounded-lg px-4 py-2 text-sm font-medium text-purple-100 transition hover:bg-white/10 hover:text-white"
          >
            Auth
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-md transition hover:bg-purple-5 hover:scale-[1.02] active:scale-[0.98]">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>

              <SignOutButton>
                <button className="rounded-lg border border-purple-400/30 bg-purple-500/10 px-3 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-500/30 hover:text-white active:scale-[0.98]">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
