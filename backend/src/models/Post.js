import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [2, "Author name must be at least 2 characters"],
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
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
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published", "archived"],
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    coverImage: {
      type: String,
      trim: true,
      default: "",
    },
    readTime: {
      type: Number,
      min: [1, "Read time must be at least 1 minute"],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate excerpt if not provided
postSchema.pre("save", function (next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.replace(/<[^>]*>/g, "").substring(0, 200) + "...";
  }
  // Auto-calculate read time (~200 words per minute)
  if (this.content) {
    const wordCount = this.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  next();
});

// Text index for search
postSchema.index({ title: "text", author: "text", content: "text" });
postSchema.index({ category: 1 });
postSchema.index({ status: 1 });
postSchema.index({ createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
