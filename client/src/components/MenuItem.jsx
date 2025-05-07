import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();
  const { user, isAdmin } = useAuth();

  const handleAddToCart = () => {
    addToCart(item._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <span className="text-orange-500 font-bold">₹{item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 text-sm mt-1 capitalize">{item.category}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${item.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {item.availability ? 'Available' : 'Unavailable'}
          </span>
          
          {user && !isAdmin() && item.availability && (
            <button
              onClick={handleAddToCart}
              className="flex items-center text-sm font-medium text-orange-500 hover:text-orange-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;