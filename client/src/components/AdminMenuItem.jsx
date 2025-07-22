import React, { useState } from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';

const AdminMenuItem = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedItem({ ...item });
  };

  const handleSave = () => {
    onEdit(item._id, editedItem);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDelete = () => onDelete(item._id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {isEditing ? (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editedItem.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={editedItem.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={editedItem.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={editedItem.availability}
                onChange={handleChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Available</label>
            </div>

            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
            <span className="text-orange-500 font-bold">₹{item.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1 capitalize">{item.category}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full ₹{item.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {item.availability ? 'Available' : 'Unavailable'}
            </span>
            <div className="flex space-x-2">
              <button onClick={handleEdit} className="text-gray-500 hover:text-orange-500 p-1">
                <Edit className="h-5 w-5" />
              </button>
              <button onClick={handleDelete} className="text-gray-500 hover:text-red-500 p-1">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenuItem;
