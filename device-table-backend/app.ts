import express from "express";
import cors from "cors";
import deviceRoutes from "./devices/device.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/devices", deviceRoutes);

export default app;
