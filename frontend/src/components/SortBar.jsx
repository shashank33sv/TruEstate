export default function SortBar({ sortBy, sortDir, onChange, total }) {
  const handleSortFieldChange = (e) => {
    onChange(e.target.value, sortDir);
  };

  const handleSortDirToggle = () => {
    onChange(sortBy, sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div className="card card-compact sort-bar">
      <div className="sort-left">
        <span style={{ fontWeight: 500 }}>Transactions</span>
        <span style={{ color: "#9ca3af", fontSize: 12 }}>
          {typeof total === "number" && total > 0
            ? `${total} records found`
            : "Browse sales data"}
        </span>
      </div>
      <div className="sort-right">
        <span style={{ fontSize: 12, color: "#6b7280" }}>Sort by:</span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={handleSortFieldChange}
        >
          <option value="date">Date (Newest first)</option>
          <option value="quantity">Quantity</option>
          <option value="customerName">Customer name (A–Z)</option>
          <option value="finalAmount">Final amount</option>
          <option value="productCategory">Product category</option>
        </select>
        <button
          type="button"
          className="sort-toggle-btn"
          onClick={handleSortDirToggle}
        >
          {sortDir === "asc" ? "Asc ↑" : "Desc ↓"}
        </button>
      </div>
    </div>
  );
}
