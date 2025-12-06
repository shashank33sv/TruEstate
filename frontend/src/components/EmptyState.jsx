export default function EmptyState({ title, description }) {
  return (
    <div className="card empty-card">
      <div className="empty-title">{title}</div>
      <div className="empty-description">{description}</div>
    </div>
  );
}
