import express , { type Request, type Response } from "express";
import RecordModel from "../schema/record";

const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    if (!userId) {
      return res.status(400).json({ message: "userId query parameter is required" });
    }
    const records = await RecordModel.find({ userId });
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send({ message: "Error fetching records", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const recordData = req.body;
    if (!Object.keys(recordData).length) {
      return res.status(400).json({ message: "recordData is required in the request body" });
    }
    const newRecord = new RecordModel(recordData);
    const savedRecord = await newRecord.save();
    res.status(201).send(savedRecord);
  } catch (error) {
    res.status(500).send({ message: "Error creating record", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {  
    const id = req.params.id; 
    const record = await RecordModel.findByIdAndUpdate(id, req.body,{new: true});
    if (!record) {
      return res.status(404).send({ message: "Record not found" });
    } 
    res.status(200).send(record);
  } catch (error) {
    res.status(500).send({ message: "Error updating record", error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await RecordModel.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send({ message: "Record not found" });
    }
    res.status(200).send({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting record", error });
  }
});

export default router;