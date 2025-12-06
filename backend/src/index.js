import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import salesRoutes from "./routes/salesRoutes.js";
import { loadSalesData } from "./utils/csvLoader.js";
import { setSalesData } from "./services/salesService.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/sales", salesRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const data = await loadSalesData();
    setSalesData(data);

    console.log(`CSV loaded: ${data.length} rows`);

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
}

start();
