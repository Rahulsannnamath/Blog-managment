import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Save, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { postApi } from "@/api/postApi";
import { postSchema } from "@/utils/validators";
import { CATEGORIES, STATUSES } from "@/constants";
import { parseTags, tagsToString } from "@/utils/helpers";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const isEdit = Boolean(post);
  const [submitting, setSubmitting] = useState(false);
  const [imgPreview, setImgPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
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

  // Watch coverImage field to drive preview
  const coverImageField = watch("coverImage");
  useEffect(() => {
    setImgPreview(coverImageField || "");
  }, [coverImageField]);

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
      if (err.errors?.length) {
        err.errors.forEach(({ field, message }) => toast.error(`${field}: ${message}`));
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
          <AlertCircle size={11} /> {error.message}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-card glass-card" style={{ padding: "1.75rem" }}>

        {/* ── Basic Information ─────────────────── */}
        <div className="form-section-label">Basic Information</div>

        <FormField id="title" label="Title" error={errors.title} required>
          <input
            id="title"
            type="text"
            placeholder="Enter post title…"
            className={`input-field ${errors.title ? "error" : ""}`}
            {...register("title")}
          />
        </FormField>

        <div className="form-grid form-grid-2">
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
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="form-grid form-grid-2">
          <FormField id="status" label="Status" error={errors.status} required>
            <select
              id="status"
              className={`input-field ${errors.status ? "error" : ""}`}
              {...register("status")}
            >
              {STATUSES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </FormField>

          <FormField id="tags" label="Tags" error={errors.tags}>
            <input
              id="tags"
              type="text"
              placeholder="e.g. react, nodejs (comma separated)"
              className={`input-field ${errors.tags ? "error" : ""}`}
              {...register("tags")}
            />
          </FormField>
        </div>

        {/* ── Media ────────────────────────────── */}
        <div className="form-section-label">Media</div>

        <FormField id="coverImage" label="Thumbnail URL" error={errors.coverImage}>
          <input
            id="coverImage"
            type="url"
            placeholder="https://example.com/image.jpg"
            className={`input-field ${errors.coverImage ? "error" : ""}`}
            {...register("coverImage")}
          />
        </FormField>

        {/* Full-width preview — shows once a URL is present */}
        {imgPreview && (
          <div className="img-preview-card">
            <div className="img-preview-wrap">
              <img
                src={imgPreview}
                alt="Cover preview"
                className="img-preview"
                onError={(e) => { e.target.style.display = "none"; }}
                onLoad={(e) => { e.target.style.display = "block"; }}
              />
            </div>
            <div className="img-preview-bar">
              <span className="img-preview-label">Image preview</span>
            </div>
          </div>
        )}

        {/* ── Content ──────────────────────────── */}
        <div className="form-section-label">Content</div>

        <FormField id="excerpt" label="Short Description" error={errors.excerpt}>
          <textarea
            id="excerpt"
            rows={3}
            placeholder="Brief summary of the post…"
            className={`input-field ${errors.excerpt ? "error" : ""}`}
            style={{ minHeight: 80, resize: "vertical" }}
            {...register("excerpt")}
          />
        </FormField>

        <FormField id="content" label="Post Content" error={errors.content} required>
          <textarea
            id="content"
            rows={10}
            placeholder="Write your full blog post content here…"
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
          <X size={14} /> Cancel
        </button>
        <button
          id="submit-post-form"
          type="submit"
          className="btn-primary"
          disabled={submitting}
        >
          {submitting ? (
            <><Loader2 size={14} className="spin" /> {isEdit ? "Saving…" : "Creating…"}</>
          ) : (
            <><Save size={14} /> {isEdit ? "Save Changes" : "Publish Post"}</>
          )}
        </button>
      </div>

      <style>{`
        .form-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--muted-foreground));
          padding: 0.5rem 0 0.2rem;
          border-top: 1px solid hsl(var(--border));
          margin-top: 0.25rem;
        }
        .form-section-label:first-child { border-top: none; margin-top: 0; padding-top: 0; }
        .form-field { display: flex; flex-direction: column; }
        .form-card > * + * { margin-top: 1.125rem; }

        /* Image preview card */
        .img-preview-card {
          border: 1px solid hsl(var(--border));
          border-radius: calc(var(--radius) - 2px);
          overflow: hidden;
          background: hsl(220 14% 97%);
        }
        .img-preview-wrap {
          width: 100%;
          background: hsl(220 14% 97%);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60px;
        }
        .img-preview {
          width: 100%;
          height: auto;
          max-height: 260px;
          object-fit: contain;
          display: block;
        }
        .img-preview-bar {
          padding: 0.45rem 0.75rem;
          background: white;
          border-top: 1px solid hsl(var(--border));
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .img-preview-label {
          font-size: 0.775rem;
          color: hsl(var(--muted-foreground));
        }

        /* Form actions */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.65rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .spin { animation: spin 1s linear infinite; }
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
