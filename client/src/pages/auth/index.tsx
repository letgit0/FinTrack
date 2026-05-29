import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-purple-50 to-violet-100 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_30%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-purple-600 to-violet-600 shadow-lg">
            <span className="text-2xl text-white">📊</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-purple-950">
            FinTrack
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Track expenses, monitor income, and manage your financial records
            effortlessly.
          </p>
        </div>

        <div className="rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-purple-900">Welcome Back</h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in or create an account to continue
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <SignedOut>
              <div className="flex w-full flex-col gap-3">
                <div className="flex justify-center rounded-2xl bg-purple-600 px-4 py-3 text-white shadow-md transition hover:bg-purple-700">
                  <SignUpButton mode="modal" />
                </div>

                <div className="flex justify-center rounded-2xl border border-purple-200 bg-white px-4 py-3 text-purple-700 transition hover:bg-purple-50">
                  <SignInButton mode="modal" />
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col items-center gap-4">
                <UserButton showName />

                <button
                  onClick={() => navigate("/")}
                  className="rounded-xl bg-purple-600 px-4 py-2 text-sm text-white shadow-md transition hover:bg-purple-700"
                >
                  Go to Dashboard
                </button>

                <div className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-red-200 hover:text-red-500">
                  <SignOutButton />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Secure authentication powered by Clerk
        </p>
      </div>
    </div>
  );
};
