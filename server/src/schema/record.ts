import mongoose from "mongoose";

interface Record {
  userId: string;
  type: string;
  amount: number;
  category: string;
  paymentMethod: string;
  date: Date;
  description: string;
}

const recordSchema = new mongoose.Schema<Record>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const RecordModel = mongoose.model<Record>("Record", recordSchema);

export default RecordModel;