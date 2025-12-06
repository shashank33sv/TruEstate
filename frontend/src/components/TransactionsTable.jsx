function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString();
}

export default function TransactionsTable({ data }) {
  return (
    <div className="card table-card">
      <div className="table-scroll">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Region</th>
              <th>Product</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Final Amount</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td>{formatDate(row.date)}</td>
                <td>
                  {row.customerName}
                  <span className="cell-sub">{row.customerType}</span>
                </td>
                <td>
                  {row.phoneNumber}
                  <span className="cell-sub">{row.gender}</span>
                </td>
                <td>{row.customerRegion}</td>
                <td>
                  {row.productName}
                  <span className="cell-sub">{row.brand}</span>
                </td>
                <td>{row.productCategory}</td>
                <td>{row.quantity}</td>
                <td>
                  ₹{Number(row.finalAmount || 0).toLocaleString("en-IN")}
                  <span className="cell-sub">
                    Disc: {row.discountPercentage}% | Qty: {row.quantity}
                  </span>
                </td>
                <td>
                  {row.paymentMethod}
                  <span className="cell-sub">{row.deliveryType}</span>
                </td>
                <td>{renderStatusBadge(row.orderStatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderStatusBadge(status) {
  const value = status || "";
  const lower = value.toLowerCase();

  let cls = "badge";
  if (lower.includes("complete")) cls += " badge-status-completed";
  else if (lower.includes("pend")) cls += " badge-status-pending";
  else if (lower.includes("cancel")) cls += " badge-status-cancelled";

  return <span className={cls}>{status}</span>;
}
