import { ChangeEvent, FormEvent, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRecords } from "../contexts/record-context";

type FormData = {
  type: "income" | "expense";
  amount: string;
  category: string;
  paymentMethod: string;
  date: string;
  description: string;
};

function RecordForm() {
  const [formData, setFormData] = useState<FormData>({
    type: "expense",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
    description: "",
  });
  const { addRecord } = useRecords();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { user } = useUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRecord = {
      ...formData,
      userId: user?.id ?? "",
      amount: Number(formData.amount),
    };

    addRecord(newRecord);

    setFormData({
      type: "expense",
      amount: "",
      category: "",
      paymentMethod: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-100 flex items-center justify-center p-2">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg border border-purple-200 rounded-3xl shadow-2xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-purple-900">
            Add a New Record
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Transaction Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              placeholder="Food, Salary, Shopping..."
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Payment Method
            </label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition"
            >
              <option value="">Select payment method</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              placeholder="Add notes..."
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-purple-700 hover:to-violet-700 active:scale-[0.99]"
          >
            Save Record
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecordForm;
