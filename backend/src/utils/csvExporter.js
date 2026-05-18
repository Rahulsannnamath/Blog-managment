const CSV_FIELDS = [
  { label: "ID", value: "_id" },
  { label: "Title", value: "title" },
  { label: "Author", value: "author" },
  { label: "Category", value: "category" },
  { label: "Status", value: "status" },
  { label: "Tags", value: (row) => (row.tags || []).join(", ") },
  { label: "Views", value: "views" },
  { label: "Likes", value: "likes" },
  { label: "Read Time (min)", value: "readTime" },
  {
    label: "Created At",
    value: (row) =>
      row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-IN") : "",
  },
  {
    label: "Updated At",
    value: (row) =>
      row.updatedAt ? new Date(row.updatedAt).toLocaleDateString("en-IN") : "",
  },
  { label: "Excerpt", value: "excerpt" },
];

export const exportToCSV = (posts) => {
  const header = CSV_FIELDS.map((f) => `"${f.label}"`).join(",");

  const rows = posts.map((post) =>
    CSV_FIELDS.map((field) => {
      const val =
        typeof field.value === "function"
          ? field.value(post)
          : post[field.value] ?? "";
      // Escape double quotes and wrap in quotes
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(",")
  );

  return [header, ...rows].join("\n");
};
