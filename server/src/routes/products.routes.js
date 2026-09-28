import express from "express";
import productValidator from "../validators/product.validator.js";
import upload from "../middlewares/upload.middleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", upload.single("image"), productValidator, createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", upload.single("image"), updateProduct);

router.get("/", getProducts);

export default router;
