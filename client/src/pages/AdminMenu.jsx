import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminMenuItem from '../components/AdminMenuItem';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../api/menuService';
import { useAuth } from '../context/AuthContext';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { token } = useAuth();
  
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    availability: true
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const data = await getMenu();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem({
      ...newItem,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    
    try {
      const itemToAdd = {
        ...newItem,
        price: parseFloat(newItem.price)
      };
      
      await addMenuItem(itemToAdd, token);
      toast.success('Menu item added successfully');
      
      setNewItem({
        name: '',
        category: '',
        price: '',
        availability: true
      });
      setShowAddForm(false);
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast.error('Failed to add menu item');
    }
  };

  const handleEditMenuItem = async (id, updatedItem) => {
    try {
      if (typeof updatedItem.price === 'string') {
        updatedItem.price = parseFloat(updatedItem.price);
      }
      
      await updateMenuItem(id, updatedItem, token);
      toast.success('Menu item updated successfully');
      
      setMenuItems(menuItems.map(item => 
        item._id === id ? { ...item, ...updatedItem } : item
      ));
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast.error('Failed to update menu item');
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await deleteMenuItem(id, token);
        toast.success('Menu item deleted successfully');
        
        setMenuItems(menuItems.filter(item => item._id !== id));
      } catch (error) {
        console.error('Error deleting menu item:', error);
        toast.error('Failed to delete menu item');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage Menu</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Item
            </button>
          </div>
          
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Add New Menu Item</h2>
                <form onSubmit={handleAddMenuItem}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newItem.name}
                        onChange={handleAddInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={newItem.category}
                        onChange={handleAddInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={newItem.price}
                        onChange={handleAddInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    <div className="flex items-center mt-6">
                      <input
                        type="checkbox"
                        name="availability"
                        checked={newItem.availability}
                        onChange={handleAddInputChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">
                        Available
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
                    >
                      Add Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : menuItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <AdminMenuItem 
                  key={item._id} 
                  item={item} 
                  onEdit={handleEditMenuItem}
                  onDelete={handleDeleteMenuItem}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 mb-4">No menu items available.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Add Your First Menu Item
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminMenu;