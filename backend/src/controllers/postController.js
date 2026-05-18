import Post from "../models/Post.js";
import { exportToCSV } from "../utils/csvExporter.js";

// ─── Helper ────────────────────────────────────────────────────────────────
const buildFilter = (query) => {
  const filter = {};

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { author: { $regex: query.search, $options: "i" } },
      { category: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.category) filter.category = query.category;
  if (query.status) filter.status = query.status;
  if (query.author) filter.author = { $regex: query.author, $options: "i" };

  return filter;
};

// ─── GET /api/posts ────────────────────────────────────────────────────────
export const getAllPosts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;
    const sortField = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const filter = buildFilter(req.query);

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/posts/export ─────────────────────────────────────────────────
export const exportPosts = async (req, res, next) => {
  try {
    const filter = buildFilter(req.query);
    const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

    const csv = exportToCSV(posts);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="posts_${Date.now()}.csv"`
    );
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/posts/:id ────────────────────────────────────────────────────
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/posts ───────────────────────────────────────────────────────
export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/posts/:id ────────────────────────────────────────────────────
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/posts/:id ─────────────────────────────────────────────────
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      const err = new Error("Post not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/posts/stats ──────────────────────────────────────────────────
export const getStats = async (_req, res, next) => {
  try {
    const [totalPosts, byStatus, byCategory, recentPosts] = await Promise.all([
      Post.countDocuments(),
      Post.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Post.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
      Post.find({ status: "published" })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title author category createdAt views")
        .lean(),
    ]);

    res.json({
      success: true,
      data: {
        totalPosts,
        byStatus: byStatus.reduce(
          (acc, item) => ({ ...acc, [item._id]: item.count }),
          {}
        ),
        byCategory,
        recentPosts,
      },
    });
  } catch (error) {
    next(error);
  }
};
