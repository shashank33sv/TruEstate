# Retail Sales Management Dashboard

## Overview
A full-stack web application to browse, search, filter, sort, and analyze sales transactions from the TruEstate dataset.  
The backend loads and processes a large CSV file, while the frontend provides an interactive dashboard with real-time updates.  
All business logic (search, filters, sorting, pagination) is implemented server-side for performance and accuracy.

---

## Tech Stack

### **Frontend**
- React (Vite)
- Custom React Hooks
- Modern dashboard UI with reusable components

### **Backend**
- Node.js + Express
- CSV Parser (`csv-parse`)
- In-memory query engine (filters, sort, search, pagination)
- CORS enabled API

---

## Search Implementation Summary
Search is implemented on the backend to ensure consistent accuracy across pages.  
The query parameter `search` is matched case-insensitively against:
- `customerName`
- `phoneNumber`

Search is applied **before filters** to reduce dataset size and optimize subsequent operations.

---

## Filter Implementation Summary
Filters are fully dynamic and parsed from query parameters.  
Implemented filters include:

### **Customer Filters**
- Region  
- Gender  
- Customer Type  
- Age Range  
- Customer Tags  

### **Product Filters**
- Category  
- Brand  
- Price Range  

### **Purchase Filters**
- Quantity Range  
- Discount Range  
- Payment Method  
- Delivery Type  
- Order Status  

### **Store Filters**
- Store Location  
- Salesperson  

### **Date Filters**
- From–To date range

Each filter is optional and combined using AND logic.  
Multi-select filters use array-based matching; numeric/date filters use range matching.

---

## Sorting Implementation Summary
Sorting is applied after filtering.  
Supported fields include:
- `date`  
- `customerName`  
- `finalAmount`  
- `quantity`  
- `productCategory`

Sorting direction:
- `asc`
- `desc`

String fields are normalized to lowercase for stable lexicographic sorting.  
Dates are compared using epoch timestamps.

---

## Pagination Implementation Summary
Pagination is performed server-side using:
- `page` (default: 1)
- `pageSize` (default: 10)

After filtering & sorting:
- Total records are counted
- Total pages are computed using `Math.ceil(total / pageSize)`
- Only the relevant slice is returned to the client

The API returns:
```json
{
  "data": [...],
  "page": 1,
  "pageSize": 10,
  "total": 1000000,
  "totalPages": 100000
}
