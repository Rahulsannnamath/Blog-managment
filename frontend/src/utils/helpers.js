import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  return format(new Date(dateString), "MMM dd, yyyy");
}

export function formatDateFull(dateString) {
  if (!dateString) return "—";
  return format(new Date(dateString), "MMMM dd, yyyy 'at' HH:mm");
}

export function timeAgo(dateString) {
  if (!dateString) return "—";
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function truncate(str, length = 80) {
  if (!str) return "";
  return str.length > length ? str.substring(0, length) + "…" : str;
}

export function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function parseTags(tagsString) {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function tagsToString(tagsArray) {
  if (!tagsArray || !Array.isArray(tagsArray)) return "";
  return tagsArray.join(", ");
}
