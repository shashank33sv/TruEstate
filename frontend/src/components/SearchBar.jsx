import { useEffect, useMemo, useState } from "react";
import { debounce } from "../utils/debounce";

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const debouncedChange = useMemo(
    () =>
      debounce((v) => {
        onChange(v);
      }, 300),
    [onChange]
  );

  const handleChange = (e) => {
    const v = e.target.value;
    setLocalValue(v);
    debouncedChange(v);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className="card card-compact search-card">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by customer name or phone number..."
          value={localValue}
          onChange={handleChange}
        />
        {localValue && (
          <button className="search-clear-btn" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
