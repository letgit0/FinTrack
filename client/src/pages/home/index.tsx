import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-linear-to-br from-purple-300 via-white to-violet-300 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
            FinTrack • Personal Finance Tracker
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Take control of your <span className="text-purple-600">money</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Track your income, expenses, and savings in one place. Build better
            financial habits and understand where your money goes.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/auth"
              className="rounded-xl bg-linear-to-r from-purple-600 to-violet-600 px-8 py-3 text-white font-semibold shadow-lg transition hover:from-purple-700 hover:to-violet-700 active:scale-[0.98]"
            >
              Get Started Free
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free to start
          </p>
        </div>
      </div>
    </>
  );
};
