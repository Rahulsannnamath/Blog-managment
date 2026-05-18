import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  exportPosts,
  getStats,
} from "../controllers/postController.js";
import { validatePost } from "../middlewares/validatePost.js";

const router = Router();

// Order matters: specific routes before parameterized ones
router.get("/export", exportPosts);
router.get("/stats", getStats);

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", validatePost, createPost);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", deletePost);

export default router;
