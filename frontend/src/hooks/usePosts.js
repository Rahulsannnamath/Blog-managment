import { useState, useCallback } from "react";
import { postApi } from "@/api/postApi";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import toast from "react-hot-toast";
import { downloadBlob } from "@/utils/helpers";


export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postApi.getAll(params);
      setPosts(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePost = useCallback(async (id, onSuccess) => {
    try {
      await postApi.delete(id);
      toast.success("Post deleted successfully!");
      onSuccess?.();
    } catch (err) {
      toast.error(err.message || "Failed to delete post");
    }
  }, []);

  const exportCSV = useCallback(async (params = {}) => {
    const toastId = toast.loading("Exporting CSV...");
    try {
      const response = await postApi.exportCSV(params);
      downloadBlob(response.data, `posts_${Date.now()}.csv`);
      toast.success("CSV exported successfully!", { id: toastId });
    } catch (err) {
      toast.error(err.message || "Export failed", { id: toastId });
    }
  }, []);


  return {
    posts,
    pagination,
    loading,
    error,
    fetchPosts,
    deletePost,
    exportCSV,
  };
}
