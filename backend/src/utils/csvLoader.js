import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

export async function loadSalesData() {
  const csvPath = path.resolve("src/data/sales.csv");

  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(csvPath)
      .pipe(parse({ columns: true, trim: true, skip_empty_lines: true }))
      .on("data", (row) => {
        rows.push({
          // Customer Info
          customerId: row["Customer ID"],
          customerName: row["Customer Name"],
          phoneNumber: row["Phone Number"],
          gender: row["Gender"],
          age: Number(row["Age"]) || null,
          customerRegion: row["Customer Region"],
          customerType: row["Customer Type"],
          tags: row["Tags"] ? row["Tags"].split(",").map((t) => t.trim()) : [],

          // Product Info
          productId: row["Product ID"],
          productName: row["Product Name"],
          productCategory: row["Product Category"],
          brand: row["Brand"],

          // Pricing Info
          quantity: Number(row["Quantity"]) || 0,
          pricePerUnit: Number(row["Price per Unit"]) || 0,
          discountPercentage: Number(row["Discount Percentage"]) || 0,
          totalAmount: Number(row["Total Amount"]) || 0,
          finalAmount: Number(row["Final Amount"]) || 0,

          // Purchase Info
          date: row["Date"] ? new Date(row["Date"]) : null,
          paymentMethod: row["Payment Method"],
          deliveryType: row["Delivery Type"],
          orderStatus: row["Order Status"],

          // Store Info
          storeLocation: row["Store Location"],
          salespersonId: row["Salesperson ID"],
          employeeName: row["Employee Name"],
        });
      })
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
}
