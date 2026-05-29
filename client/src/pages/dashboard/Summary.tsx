import { useRecords } from "../contexts/record-context";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  value: number;
};

export const FinanceChart = () => {
  const { summary } = useRecords();
  const { income, expenses } = summary;

  const data: ChartData[] = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="rounded-3xl border border-purple-200 bg-white/70 p-6 shadow-xl backdrop-blur-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-900">
          Financial Overview
        </h2>

        <p className="mt-1 text-purple-600">Income vs expenses distribution</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={5}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const DashboardSummary = () => {
  const { summary } = useRecords();

  const { income, expenses } = summary;

  const balance = income - expenses;

  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: "Total Balance",
      value: `₹${balance.toLocaleString()}`,
      bg: "from-purple-600 to-violet-600",
    },
    {
      title: "Income",
      value: `₹${income.toLocaleString()}`,
      bg: "from-emerald-500 to-green-600",
    },
    {
      title: "Expenses",
      value: `₹${expenses.toLocaleString()}`,
      bg: "from-rose-500 to-red-600",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      bg: "from-fuchsia-500 to-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-3xl bg-linear-to-br ${card.bg} p-6 text-white shadow-xl`}
        >
          <p className="text-sm opacity-80">{card.title}</p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export const Insights = () => {
  const { summary } = useRecords();
  const { income, expenses } = summary;

  const balance = income - expenses;
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;
  const expenseRatio = income > 0 ? (expenses / income) * 100 : 0;

  const getFinancialMessage = () => {
    if (income === 0 && expenses === 0) {
      return "Start adding transactions to see your financial insights.";
    }
    if (balance < 0) {
      return "Your expenses exceeded your income this month.";
    }
    if (savingsRate >= 40) {
      return "Excellent savings habits this month.";
    }
    if (savingsRate >= 20) {
      return "Your finances are looking healthy.";
    }
    return "Your expenses are manageable, but there’s room to save more.";
  };

  const getSavingsPotential = () => {
    if (balance < 0)
      return {
        text: "Critical",
        textClass: "text-rose-600",
        bgClass: "from-rose-50 to-red-50/50 border-rose-100",
      };
    if (savingsRate >= 40)
      return {
        text: "Excellent",
        textClass: "text-emerald-600",
        bgClass: "from-emerald-50 to-teal-50/50 border-emerald-100",
      };
    if (savingsRate >= 20)
      return {
        text: "Good",
        textClass: "text-teal-600",
        bgClass: "from-teal-50 to-cyan-50/50 border-teal-100",
      };
    return {
      text: "Low",
      textClass: "text-amber-600",
      bgClass: "from-amber-50 to-orange-50/50 border-amber-100",
    };
  };

  const getSpendingPattern = () => {
    if (income === 0)
      return {
        text: "No Data",
        textClass: "text-slate-500",
        bgClass: "from-slate-50 to-slate-100/50 border-slate-200",
      };
    if (expenseRatio >= 90)
      return {
        text: "High Spending",
        textClass: "text-rose-600",
        bgClass: "from-rose-50 to-red-50/50 border-rose-100",
      };
    if (expenseRatio >= 70)
      return {
        text: "Moderate",
        textClass: "text-amber-600",
        bgClass: "from-amber-50 to-orange-50/50 border-amber-100",
      };
    return {
      text: "Controlled",
      textClass: "text-emerald-600",
      bgClass: "from-emerald-50 to-teal-50/50 border-emerald-100",
    };
  };

  const savingsPotential = getSavingsPotential();
  const spendingPattern = getSpendingPattern();

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-100/40">
      <div>
        <h2 className="text-2xl font-bold text-purple-900">
          Financial Insights
        </h2>
        <p className="mt-2 text-purple-600 leading-relaxed">
          {getFinancialMessage()}
        </p>
      </div>

      <div className="mt-6 grid grow gap-4 sm:grid-cols-2">
        <div
          className={`flex flex-col justify-center rounded-2xl bg-linear-to-br p-6 border ${savingsPotential.bgClass}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-500">
            Savings Potential
          </p>
          <h3
            className={`mt-2 text-2xl font-bold ${savingsPotential.textClass}`}
          >
            {savingsPotential.text}
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Savings rate: {savingsRate.toFixed(1)}%
          </p>
        </div>

        <div
          className={`flex flex-col justify-center rounded-2xl bg-linear-to-br p-6 border ${spendingPattern.bgClass}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-500">
            Spending Pattern
          </p>
          <h3
            className={`mt-2 text-2xl font-bold ${spendingPattern.textClass}`}
          >
            {spendingPattern.text}
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            ₹ {expenses.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 border border-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-purple-500 uppercase tracking-wider">
              Current Balance
            </p>
            <h3 className="mt-1 text-2xl font-bold text-purple-900">
              ₹{balance.toLocaleString()}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-purple-500 uppercase tracking-wider">
              Expense Ratio
            </p>
            <h3 className="mt-1 text-2xl font-bold text-purple-700">
              {expenseRatio.toFixed(1)}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
