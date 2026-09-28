import React, { useEffect, useState } from "react";

const ItemForm = ({ item, onAdd, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        image: null,
      });

      setPreview(item.image || "");
    } else {
      setFormData({
        name: "",
        description: "",
        image: null,
      });

      setPreview("");
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Product description is required.");
      return;
    }

    if (!item && !formData.image) {
      alert("Please select a product image.");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("name", formData.name.trim());

      data.append("description", formData.description.trim());

      if (formData.image) {
        data.append("image", formData.image);
      }

      console.log("Submitting Product:");

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      if (!item) {
        await onAdd(data);
      } else {
        await onUpdate(item._id, data);
      }
    } catch (error) {
      console.error("Product Submit Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#111111] p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {item ? "Edit Product" : "Add Product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              className="w-full rounded-lg border border-gray-800 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-lime-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
              minLength={20}
              maxLength={200}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-800 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-lime-400"
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">
              Product Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required={!item}
              className="w-full cursor-pointer rounded-lg border border-gray-800 bg-[#0b0b0b] px-4 py-3 text-gray-400 outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-lime-400 file:px-3 file:py-2 file:text-sm file:font-medium file:text-black hover:border-lime-400"
            />

            {item && (
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to keep the existing image.
              </p>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="overflow-hidden rounded-lg border border-gray-800">
              <img
                src={preview}
                alt="Product Preview"
                className="h-40 w-full object-cover"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-lime-400 py-3 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? item
                ? "Updating..."
                : "Adding..."
              : item
                ? "Update Product"
                : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
