import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { postApi } from "@/api/postApi";
import { postSchema } from "@/utils/validators";
import { CATEGORIES, STATUSES } from "@/constants";
import { parseTags, tagsToString } from "@/utils/helpers";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const isEdit = Boolean(post);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
      category: "",
      excerpt: "",
      tags: "",
      status: "draft",
      coverImage: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        content: post.content || "",
        author: post.author || "",
        category: post.category || "",
        excerpt: post.excerpt || "",
        tags: tagsToString(post.tags),
        status: post.status || "draft",
        coverImage: post.coverImage || "",
      });
    }
  }, [post, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        tags: parseTags(data.tags),
        excerpt: data.excerpt || undefined,
        coverImage: data.coverImage || undefined,
      };

      if (isEdit) {
        await postApi.update(post._id, payload);
        toast.success("Post updated successfully!");
      } else {
        await postApi.create(payload);
        toast.success("Post created successfully!");
      }
      navigate("/");
    } catch (err) {
      // Handle server-side validation errors
      if (err.errors?.length) {
        err.errors.forEach(({ field, message }) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        toast.error(err.message || "Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const FormField = ({ id, label, error, required, children }) => (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span style={{ color: "hsl(var(--destructive))" }}> *</span>}
      </label>
      {children}
      {error && (
        <p className="form-error">
          <AlertCircle size={12} />
          {error.message}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-card glass-card" style={{ padding: "1.75rem" }}>
        {/* Row 1: Title */}
        <FormField id="title" label="Title" error={errors.title} required>
          <input
            id="title"
            type="text"
            placeholder="Enter post title…"
            className={`input-field ${errors.title ? "error" : ""}`}
            {...register("title")}
          />
        </FormField>

        {/* Row 2: Author + Category */}
        <div className="form-grid form-grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <FormField id="author" label="Author" error={errors.author} required>
            <input
              id="author"
              type="text"
              placeholder="Author name…"
              className={`input-field ${errors.author ? "error" : ""}`}
              {...register("author")}
            />
          </FormField>

          <FormField id="category" label="Category" error={errors.category} required>
            <select
              id="category"
              className={`input-field ${errors.category ? "error" : ""}`}
              {...register("category")}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Row 3: Status + Tags */}
        <div className="form-grid form-grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <FormField id="status" label="Status" error={errors.status} required>
            <select
              id="status"
              className={`input-field ${errors.status ? "error" : ""}`}
              {...register("status")}
            >
              {STATUSES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="tags" label="Tags" error={errors.tags}>
            <input
              id="tags"
              type="text"
              placeholder="e.g. react, nodejs, api (comma separated)"
              className={`input-field ${errors.tags ? "error" : ""}`}
              {...register("tags")}
            />
          </FormField>
        </div>

        {/* Row 4: Cover Image */}
        <FormField id="coverImage" label="Cover Image URL" error={errors.coverImage}>
          <input
            id="coverImage"
            type="url"
            placeholder="https://example.com/image.jpg"
            className={`input-field ${errors.coverImage ? "error" : ""}`}
            {...register("coverImage")}
          />
        </FormField>

        {/* Row 5: Excerpt */}
        <FormField id="excerpt" label="Excerpt" error={errors.excerpt}>
          <textarea
            id="excerpt"
            rows={3}
            placeholder="Short summary (auto-generated if left empty)…"
            className={`input-field ${errors.excerpt ? "error" : ""}`}
            style={{ minHeight: 80, resize: "vertical" }}
            {...register("excerpt")}
          />
        </FormField>

        {/* Row 6: Content */}
        <FormField id="content" label="Content" error={errors.content} required>
          <textarea
            id="content"
            rows={10}
            placeholder="Write your post content here…"
            className={`input-field ${errors.content ? "error" : ""}`}
            style={{ minHeight: 220, resize: "vertical", lineHeight: 1.7 }}
            {...register("content")}
          />
        </FormField>
      </div>

      {/* Form actions */}
      <div className="form-actions">
        <button
          type="button"
          className="btn-ghost"
          onClick={() => navigate(-1)}
          disabled={submitting}
        >
          <X size={15} />
          Cancel
        </button>
        <button
          id="submit-post-form"
          type="submit"
          className="btn-primary"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 size={15} className="spin" />
              {isEdit ? "Saving…" : "Creating…"}
            </>
          ) : (
            <>
              <Save size={15} />
              {isEdit ? "Save Changes" : "Publish Post"}
            </>
          )}
        </button>
      </div>

      <style>{`
        .form-field { display: flex; flex-direction: column; gap: 0; margin-bottom: 0; }
        .form-card > * + * { margin-top: 1.25rem; }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .form-actions { justify-content: stretch; }
          .form-actions button { flex: 1; justify-content: center; }
        }
      `}</style>
    </form>
  );
}
