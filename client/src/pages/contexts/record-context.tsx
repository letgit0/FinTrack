import { createContext, useContext, useState } from "react";

interface FinancialRecord {
  id?: string;
  userId: string;
  type: string;
  amount: number;
  category: string;
  paymentMethod: string;
  date: string;
  description: string;
}

interface RecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  // updateRecord: (id: string, newRecord: FinancialRecord) => void;
  // deleteRecord: (id: string) => void;
}

export const RecordsContext = createContext<RecordsContextType | undefined>(
  undefined,
);

export const RecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch("http://localhost:5000/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...record,
          amount: Number(record.amount),
        }),
      });

      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {
      console.error("Failed to add record:", error);
    }
  };

  return (
    <RecordsContext.Provider value={{ records, addRecord }}>
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = () => {
  const context = useContext<RecordsContextType | undefined>(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};
