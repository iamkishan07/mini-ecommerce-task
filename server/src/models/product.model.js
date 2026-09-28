import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },

  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 200,
  },

  image: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
