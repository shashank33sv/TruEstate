export default function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  return (
    <div className="card card-compact pagination-bar">
      <div className="pagination-info">
        {total === 0 ? (
          "No records to display"
        ) : (
          <>
            Showing <strong>{from}</strong>–<strong>{to}</strong> of{" "}
            <strong>{total}</strong> records
          </>
        )}
      </div>
      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span style={{ fontSize: 12 }}>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          className="pagination-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
