export default function RangeFilter({
  min,
  max,
  onChangeMin,
  onChangeMax,
  placeholderMin = "Min",
  placeholderMax = "Max",
}) {
  return (
    <div className="range-row">
      <div style={{ flex: 1 }}>
        <div className="range-label">From</div>
        <input
          className="filter-input"
          type="number"
          value={min ?? ""}
          placeholder={placeholderMin}
          onChange={(e) => onChangeMin(e.target.value)}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className="range-label">To</div>
        <input
          className="filter-input"
          type="number"
          value={max ?? ""}
          placeholder={placeholderMax}
          onChange={(e) => onChangeMax(e.target.value)}
        />
      </div>
    </div>
  );
}
