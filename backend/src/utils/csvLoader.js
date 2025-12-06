import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import fetch from "node-fetch";

const CSV_PATH = path.resolve("src/data/sales.csv");

// Download CSV from remote Google Drive link
async function downloadCSV() {
  if (fs.existsSync(CSV_PATH)) {
    console.log("✔ CSV already exists. Skipping download.");
    return;
  }

  console.log("⚠ CSV not found. Downloading from Google Drive...");

  const FILE_URL = process.env.CSV_URL;
  if (!FILE_URL) {
    throw new Error("❌ CSV_URL environment variable is missing.");
  }

  const response = await fetch(FILE_URL);
  if (!response.ok) {
    throw new Error("❌ Failed to download CSV file.");
  }

  const fileStream = fs.createWriteStream(CSV_PATH);
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream)
      .on("finish", resolve)
      .on("error", reject);
  });

  console.log("✔ CSV downloaded successfully.");
}

// Load CSV data (after ensuring file exists)
export async function loadSalesData() {
  await downloadCSV();

  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(CSV_PATH)
      .pipe(parse({ columns: true, trim: true, skip_empty_lines: true }))
      .on("data", (row) => {
        rows.push({
          customerId: row["Customer ID"],
          customerName: row["Customer Name"],
          phoneNumber: row["Phone Number"],
          gender: row["Gender"],
          age: Number(row["Age"]) || null,
          customerRegion: row["Customer Region"],
          customerType: row["Customer Type"],
          tags: row["Tags"] ? row["Tags"].split(",").map((t) => t.trim()) : [],

          productId: row["Product ID"],
          productName: row["Product Name"],
          productCategory: row["Product Category"],
          brand: row["Brand"],

          quantity: Number(row["Quantity"]) || 0,
          pricePerUnit: Number(row["Price per Unit"]) || 0,
          discountPercentage: Number(row["Discount Percentage"]) || 0,
          totalAmount: Number(row["Total Amount"]) || 0,
          finalAmount: Number(row["Final Amount"]) || 0,

          date: row["Date"] ? new Date(row["Date"]) : null,
          paymentMethod: row["Payment Method"],
          deliveryType: row["Delivery Type"],
          orderStatus: row["Order Status"],

          storeLocation: row["Store Location"],
          salespersonId: row["Salesperson ID"],
          employeeName: row["Employee Name"],
        });
      })
      .on("end", () => {
        console.log(`✔ Loaded ${rows.length} sales records.`);
        resolve(rows);
      })
      .on("error", (err) => reject(err));
  });
}
