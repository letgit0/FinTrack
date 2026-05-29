import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";

export interface FinancialRecord {
  _id?: string;
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
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
  summary: {
    income: number;
    expenses: number;
  };
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

  const {user} = useUser();;
  const fetchRecords = async () => {
    if(!user) return;
    const response = await fetch(`http://localhost:5000/records/getAllByUserId/${user?.id}`);

    if(response.ok){
      const recs = await response.json();
      console.log("Fetched records:", recs);
      setRecords(recs);
    }
  }

  useEffect(() =>{
    fetchRecords();
  },[user]);

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

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    try {
      const response = await fetch(`http://localhost:5000/records/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newRecord,
          amount: Number(newRecord.amount),
        }),
      });
      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((rec) => (rec._id === id ? updatedRecord : rec)),
        );
      }
    } catch (error) {
      console.error("Failed to update record:", error);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/records/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRecords((prev) => prev.filter((rec) => rec._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  const summary = useMemo(() => {
    const income = records
      .filter(r => r.type === "income")
      .reduce((sum, r) => sum + r.amount, 0);

    const expenses = records
      .filter(r => r.type === "expense")
      .reduce((sum, r) => sum + r.amount, 0);


    return {
      income,
      expenses,
    };
  }, [records]);

  return (
    <RecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord, summary }}>
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
