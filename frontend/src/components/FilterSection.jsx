export default function FilterSection({ label, hint, children }) {
  return (
    <div className="filter-section">
      <div className="filter-section-header">
        <span className="filter-section-label">{label}</span>
        {hint && <span className="filter-section-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
