export default function PostStatusBadge({ status }) {
  const map = {
    published: { className: "badge badge-published", dot: "#22c55e", label: "Published" },
    draft: { className: "badge badge-draft", dot: "#f59e0b", label: "Draft" },
    archived: { className: "badge badge-archived", dot: "#6b7280", label: "Archived" },
  };

  const config = map[status] || map.draft;

  return (
    <span className={config.className}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: config.dot,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  );
}
