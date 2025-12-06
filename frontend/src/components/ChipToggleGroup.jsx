export default function ChipToggleGroup({ options, value, onChange }) {
  const handleToggle = (option) => {
    if (!value) {
      onChange([option]);
      return;
    }
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="chip-group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={
            "chip" + (value?.includes(opt.value) ? " chip-active" : "")
          }
          onClick={() => handleToggle(opt.value)}
        >
          <span className="chip-dot" />
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
