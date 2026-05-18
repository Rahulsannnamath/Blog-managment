import { z } from "zod";
import { CATEGORIES, STATUSES } from "@/constants";

const categoryValues = CATEGORIES;
const statusValues = STATUSES.map((s) => s.value);

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters")
    .trim(),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .trim(),

  author: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name cannot exceed 100 characters")
    .trim(),

  category: z
    .enum(categoryValues, {
      errorMap: () => ({ message: "Please select a valid category" }),
    }),

  excerpt: z
    .string()
    .max(500, "Excerpt cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),

  tags: z.string().optional(), // comma-separated input; we parse on submit

  status: z
    .enum(statusValues, {
      errorMap: () => ({ message: "Please select a valid status" }),
    })
    .default("draft"),

  coverImage: z
    .string()
    .url("Cover image must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export const searchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
});
