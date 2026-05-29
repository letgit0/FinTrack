import { useUser } from "@clerk/clerk-react";
import RecordForm from "./RecordForm";
import RecordList from "./RecordList";
import { Navbar } from "../../components/Navbar";
import { FinanceChart, DashboardSummary, Insights } from "./Summary";
import { Footer } from "../../components/Footer";

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-violet-50 to-fuchsia-100 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-purple-200 bg-white/70 p-8 shadow-xl backdrop-blur-lg md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-purple-900">
                Welcome back, {user?.firstName} !
              </h1>

              <p className="mt-2 text-purple-600">
                Track your income, expenses, and financial activity.
              </p>
            </div>

            <div className="rounded-2xl bg-linear-to-r from-purple-600 to-violet-600 px-6 py-4 text-white shadow-lg">
              <p className="text-sm opacity-90">FinTrack</p>

              <h2 className="text-2xl font-bold">Dashboard</h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr]">
            <div>
              <RecordForm />
            </div>

            <div>
              <RecordList />
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <DashboardSummary />

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <FinanceChart />
              <Insights />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
