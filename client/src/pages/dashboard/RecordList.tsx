import { useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

import { useRecords, type FinancialRecord } from "../contexts/record-context";

function RecordList() {
  const { records, updateRecord, deleteRecord } = useRecords();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesCategory = categoryFilter
        ? record.category.toLowerCase().includes(categoryFilter.toLowerCase())
        : true;

      const matchesType = typeFilter
        ? record.type.toLowerCase() === typeFilter.toLowerCase()
        : true;

      const matchesDate = dateFilter ? record.date.includes(dateFilter) : true;

      return matchesCategory && matchesType && matchesDate;
    });
  }, [records, categoryFilter, typeFilter, dateFilter]);

  const handleUpdate = async (
    rowIndex: number,
    columnId: keyof FinancialRecord,
    value: string,
  ) => {
    const record = filteredRecords[rowIndex];

    if (!record._id) return;

    await updateRecord(record._id, {
      ...record,
      [columnId]: columnId === "amount" ? Number(value) : value,
    });
  };

  const EditableCell = ({
    value,
    rowIndex,
    columnId,
  }: {
    value: string | number;
    rowIndex: number;
    columnId: keyof FinancialRecord;
  }) => {
    const [editingValue, setEditingValue] = useState(value);

    return (
      <input
        value={editingValue}
        onChange={(e) => setEditingValue(e.target.value)}
        onBlur={() => handleUpdate(rowIndex, columnId, editingValue.toString())}
        className={`w-full rounded-md border border-transparent bg-transparent p-2 text-sm text-slate-700 outline-none transition
      hover:border-purple-200 hover:bg-purple-50/60
      focus:border-purple-200 focus:bg-white focus:ring-2 focus:ring-purple-100
      ${columnId === "amount" ? "text-right" : "text-left"}`}
      />
    );
  };

  const columns = useMemo<ColumnDef<FinancialRecord>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium ${
              row.original.type.toLowerCase() === "income"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {row.original.type}
          </span>
        ),
      },

      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <div className="text-right">
            <EditableCell
              value={row.original.amount}
              rowIndex={row.index}
              columnId="amount"
            />
          </div>
        ),
      },

      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.category}
            rowIndex={row.index}
            columnId="category"
          />
        ),
      },

      {
        accessorKey: "paymentMethod",
        header: "Payment",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.paymentMethod}
            rowIndex={row.index}
            columnId="paymentMethod"
          />
        ),
      },

      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.description}
            rowIndex={row.index}
            columnId="description"
          />
        ),
      },

      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
          const formattedDate = new Date(row.original.date).toLocaleString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          );

          return (
            <div className="text-left text-sm whitespace-nowrap text-slate-500">
              {formattedDate}
            </div>
          );
        },
      },

      {
        id: "delete",
        header: "Action",
        cell: ({ row }) => (
          <button
            onClick={() => {
              if (row.original._id) {
                deleteRecord(row.original._id);
              }
            }}
            className="text-sm font-medium text-slate-400/80 transition-colors duration-200 hover:text-red-500"
          >
            Delete
          </button>
        ),
      },
    ],
    [filteredRecords],
  );

  const table = useReactTable({
    data: filteredRecords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-purple-900">
            Financial Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">Manage transactions</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-3 text-white shadow-lg">
          <p className="text-xs uppercase tracking-wide opacity-80">
            Total Records
          </p>

          <h3 className="text-2xl font-bold">{filteredRecords.length}</h3>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-2xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-200"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-2xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm outline-none transition placeholder:text-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-2xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-200"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-purple-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-[16px] text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-purple-100 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-purple-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-3 align-middle text-sm text-slate-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="bg-white py-12 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <span className="text-2xl">📊</span>
            </div>

            <h3 className="text-lg font-semibold text-purple-900">
              No Records Found
            </h3>

            <p className="mt-1 text-purple-500">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordList;
