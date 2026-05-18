import axios from "axios";
import { API_BASE_URL } from "@/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor – unwrap data or throw structured errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    const errors = error.response?.data?.errors || [];
    const err = new Error(message);
    err.statusCode = error.response?.status;
    err.errors = errors;
    return Promise.reject(err);
  }
);

// ─── Post API calls ────────────────────────────────────────────────────────

export const postApi = {
  /**
   * Get all posts with pagination, search, and filters.
   */
  getAll: (params = {}) => api.get("/posts", { params }),

  /**
   * Get single post by ID.
   */
  getById: (id) => api.get(`/posts/${id}`),

  /**
   * Create a new post.
   */
  create: (data) => api.post("/posts", data),

  /**
   * Update an existing post.
   */
  update: (id, data) => api.put(`/posts/${id}`, data),

  /**
   * Delete a post by ID.
   */
  delete: (id) => api.delete(`/posts/${id}`),

  /**
   * Download posts as CSV. Returns a blob.
   */
  exportCSV: (params = {}) =>
    api.get("/posts/export", {
      params,
      responseType: "blob",
    }),

  /**
   * Get dashboard stats.
   */
  getStats: () => api.get("/posts/stats"),
};

export default api;
