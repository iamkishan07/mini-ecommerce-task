import { body, validationResult } from "express-validator";

const productValidator = [
  body("name")
    .exists()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Product name must be between 2 and 50 characters"),

  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 20, max: 200 })
    .withMessage("Description must be between 20 and 200 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    // Multer se image check
    if (!req.file) {
      return res.status(400).json({
        message: "Validation failed",
        errors: [
          {
            type: "field",
            msg: "Image is required",
            path: "image",
            location: "file",
          },
        ],
      });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

export default productValidator;
