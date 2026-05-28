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

export default router;