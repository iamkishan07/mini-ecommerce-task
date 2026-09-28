import React from "react";

const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden hover:border-lime-400/40 transition">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold text-white">{item.name}</h2>

        <p className="text-gray-500 text-sm mt-2">{item.description}</p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-lime-400 hover:text-lime-400 transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="flex-1 py-2 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-500/10 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
