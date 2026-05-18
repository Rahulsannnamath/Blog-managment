import { body, validationResult } from "express-validator";

export const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Author name must be between 2 and 100 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
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
    ])
    .withMessage("Invalid category"),

  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Status must be draft, published, or archived"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("coverImage")
    .optional()
    .isURL()
    .withMessage("Cover image must be a valid URL"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }
    next();
  },
];
