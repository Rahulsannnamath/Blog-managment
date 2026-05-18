// Post categories
export const CATEGORIES = [
  "Technology",
  "Travel",
  "Food",
  "Health",
  "Business",
  "Lifestyle",
  "Science",
  "Entertainment",
  "Sports",
  "Politics",
  "Education",
  "Other",
];

// Post statuses
export const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

// Sort options
export const SORT_OPTIONS = [
  { value: "createdAt", label: "Date Created" },
  { value: "updatedAt", label: "Last Updated" },
  { value: "title", label: "Title" },
  { value: "views", label: "Views" },
  { value: "likes", label: "Likes" },
];

// Items per page options
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// Default pagination
export const DEFAULT_PAGE_SIZE = 10;

// API base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
