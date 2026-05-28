import express from "express";
import type { Express } from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recordRoutes from "./routes/records";

dotenv.config({ path: ".env.local" });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const MONGOURI = process.env.MONGOURI;

if (!MONGOURI) {
    throw new Error("MONGOURI is not defined in .env file");
}

mongoose.connect(MONGOURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/records', recordRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});